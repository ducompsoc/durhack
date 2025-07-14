import { ClientError, HttpStatus } from "@otterhttp/errors"
import type { Prisma, UserApplicationStatus } from "@prisma/client"
import {
  getApplicationsGroupedByDietaryRequirement,
  getApplicationsGroupedByDisciplineOfStudy,
} from "@prisma/client/sql"

import { origin } from "@/config"
import { prisma } from "@/database"
import { Group, onlyGroups } from "@/decorators/authorise"
import type { Middleware, Request, Response } from "@/types"

class ApplicationsHandlers {
  hasAttendanceFlag(): Prisma.UserWhereInput["userFlags"] {
    return { some: { flagName: "attendance" } }
  }

  private async getTotalApplicationCount(
    applicationStatusFilter: UserApplicationStatus[],
    whereOnlyCheckedIn: boolean,
  ): Promise<number> {
    return await prisma.user.count({
      where: {
        userInfo: {
          applicationStatus: {
            in: applicationStatusFilter,
          },
        },
        userFlags: whereOnlyCheckedIn ? this.hasAttendanceFlag() : undefined,
      },
    })
  }

  private async getTotalCvCount(
    applicationStatusFilter: UserApplicationStatus[],
    whereOnlyCheckedIn: boolean,
  ): Promise<number> {
    return await prisma.user.count({
      where: {
        userInfo: {
          applicationStatus: {
            in: applicationStatusFilter,
          },
        },
        userCv: { isNot: null },
        userFlags: whereOnlyCheckedIn ? this.hasAttendanceFlag() : undefined,
      },
    })
  }

  private getApplicationStatusFilter(response: Response): UserApplicationStatus[] {
    // with query parameter "all", include everyone that was at one point 'submitted'
    if (response.locals.includeAll === true) return ["submitted", "accepted", "waitingList"]
    // with query parameter "attendees", include everyone that was at one point 'submitted'
    if (response.locals.whereOnlyCheckedIn === true) return ["submitted", "accepted", "waitingList"]
    // with no query parameters, only include people that have been assigned tickets
    return ["accepted"]
  }

  private getRawApplicationStatusFilter(
    response: Response,
  ): ("unsubmitted" | "submitted" | "accepted" | "waiting_list")[] {
    // with query parameter "all", include everyone that was at one point 'submitted'
    if (response.locals.includeAll === true) return ["submitted", "accepted", "waiting_list"]
    // with query parameter "attendees", include everyone that was at one point 'submitted'
    if (response.locals.whereOnlyCheckedIn === true) return ["submitted", "accepted", "waiting_list"]
    // with no query parameters, only include people that have been assigned tickets
    return ["accepted"]
  }

  private getFilterDescription(response: Response): string {
    if (response.locals.includeAll === true) return "`all`: All completed applications are considered"
    if (response.locals.whereOnlyCheckedIn === true)
      return "`attendees`: Only completed applications for checked-in attendees are considered"
    return "`accepted`: only completed applications which have been assigned tickets are considered"
  }

  private getFilteredUrls(request: Request, _response: Response): Record<string, URL> {
    return {
      filter_accepted_url: new URL(`${request.pathnameWithoutTrailingSlash}`, origin),
      filter_all_url: new URL(`${request.pathnameWithoutTrailingSlash}?all=`, origin),
      filter_attendees_url: new URL(`${request.pathnameWithoutTrailingSlash}?attendees=`, origin),
    }
  }

  /**
   * Format a proportion (a real number within the interval <code>[0,1]</code>) as a
   * percentage string.
   *
   * @example
   * formatAsPercentage(0.25) // "25.00%"
   *
   * @example
   * formatAsPercentage(0.0052) // "0.52%"
   */
  private formatAsPercentage(value: number): string {
    return value.toLocaleString(undefined, { style: "percent", minimumFractionDigits: 2 })
  }

  /**
   * Rounding factor used for {@link roundProportion}. The exponent (<code>4</code>) controls
   * the number of decimal places values will be rounded to.
   */
  private static roundProportionRoundingFactor = 10 ** 4

  /**
   * Round a proportion (a real number within the interval <code>[0,1]</code>) according to {@link roundProportionRoundingFactor}.
   * Useful for keeping behaviour consistent across all routes.
   */
  private roundProportion(value: number): number {
    const roundingFactor = ApplicationsHandlers.roundProportionRoundingFactor
    return Math.round((value + Number.EPSILON) * roundingFactor) / roundingFactor
  }

  /**
   * Returns a middleware which parses query parameters for `/applications` routes and saves the parsed results in
   * <code>response.locals</code>.
   */
  parseQueryParameters(): Middleware {
    return (request, response, next) => {
      response.locals.whereOnlyCheckedIn = Object.hasOwn(request.query, "attendees")
      response.locals.includeAll = Object.hasOwn(request.query, "all")

      if (response.locals.whereOnlyCheckedIn && response.locals.includeAll) {
        throw new ClientError("Cannot simultaneously filter by 'all' and 'attendees'", {
          statusCode: HttpStatus.BadRequest,
          exposeMessage: true,
          expected: true,
          code: "ERR_QUERY_PARAMETER_CONFLICT",
        })
      }

      next()
    }
  }

  /**
   * Returns a middleware that handles a GET request by responding with a JSON payload containing summary statistics
   * relating to DurHack applications.
   */
  @onlyGroups([Group.organisers, Group.admins])
  getApplicationsSummary(): Middleware {
    return async (request, response) => {
      const applicationStatusFilter = this.getApplicationStatusFilter(response)
      const [totalApplicationCount, totalCvCount] = await Promise.all([
        this.getTotalApplicationCount(applicationStatusFilter, response.locals.whereOnlyCheckedIn === true),
        this.getTotalCvCount(applicationStatusFilter, response.locals.whereOnlyCheckedIn === true),
      ])

      const totalCvProportion = this.roundProportion(totalCvCount / totalApplicationCount)

      response.json({
        data: {
          total_application_count: totalApplicationCount,
          total_cv_count: totalCvCount,
          total_cv_proportion: totalCvProportion,
          total_cv_percentage: this.formatAsPercentage(totalCvProportion),
        },
        filter_description: this.getFilterDescription(response),
        ...this.getFilteredUrls(request, response),
        group_by_institution_url: new URL(`/applications/by-institution${request.queryString}`, origin),
        group_by_level_of_study_url: new URL(`/applications/by-level-of-study${request.queryString}`, origin),
        group_by_discipline_of_study_url: new URL(`/applications/by-discipline-of-study${request.queryString}`, origin),
        group_by_dietary_requirement_url: new URL(`/applications/by-dietary-requirement${request.queryString}`, origin),
        group_by_gender_identity_url: new URL(`/applications/by-gender-identity${request.queryString}`, origin),
        data_export_url: new URL("/applications/data-export", origin),
      })
    }
  }

  /**
   * Returns a middleware that handles a GET request by responding with a JSON payload containing a list of
   * institutions and their application counts.
   * Only institutions with applications are included; omission of an institution means there are zero submitted
   * applications from students attending that institution.
   */
  @onlyGroups([Group.organisers, Group.admins])
  getApplicationsByInstitution(): Middleware {
    return async (request, response) => {
      const applicationStatusFilter = this.getApplicationStatusFilter(response)
      const [result, totalApplicationCount] = await Promise.all([
        prisma.userInfo.groupBy({
          by: ["university"],
          where: {
            applicationStatus: {
              in: applicationStatusFilter,
            },
            user: response.locals.whereOnlyCheckedIn === true ? { userFlags: this.hasAttendanceFlag() } : undefined,
          },
          _count: {
            userId: true,
          },
        }),
        this.getTotalApplicationCount(applicationStatusFilter, response.locals.whereOnlyCheckedIn === true),
      ])

      const rows = result.map((resultItem) => {
        const proportion = this.roundProportion(resultItem._count.userId / totalApplicationCount)

        return {
          institution: resultItem.university,
          application_count: resultItem._count.userId,
          application_proportion: proportion,
          application_percentage: this.formatAsPercentage(proportion),
        }
      })

      response.json({
        data: rows,
        filter_description: this.getFilterDescription(response),
        ...this.getFilteredUrls(request, response),
        summary_url: new URL(`/applications${request.queryString}`, origin),
      })
    }
  }

  /**
   * Returns a middleware that handles a GET request by responding with a JSON payload containing a list of
   * levels of study and their application counts.
   * Only levels of study with applications are included; omission of a level of study means there are zero submitted
   * applications from students at that level of study.
   */
  @onlyGroups([Group.organisers, Group.admins])
  getApplicationsByLevelOfStudy(): Middleware {
    return async (request, response) => {
      const applicationStatusFilter = this.getApplicationStatusFilter(response)
      const [result, totalApplicationCount] = await Promise.all([
        prisma.userInfo.groupBy({
          by: ["levelOfStudy"],
          where: {
            applicationStatus: {
              in: applicationStatusFilter,
            },
            user: response.locals.whereOnlyCheckedIn === true ? { userFlags: this.hasAttendanceFlag() } : undefined,
          },
          _count: {
            userId: true,
          },
        }),
        this.getTotalApplicationCount(applicationStatusFilter, response.locals.whereOnlyCheckedIn === true),
      ])

      const rows = result.map((resultItem) => {
        const proportion = this.roundProportion(resultItem._count.userId / totalApplicationCount)

        return {
          level_of_study: resultItem.levelOfStudy,
          application_count: resultItem._count.userId,
          application_proportion: proportion,
          application_percentage: this.formatAsPercentage(proportion),
        }
      })

      response.json({
        data: rows,
        filter_description: this.getFilterDescription(response),
        ...this.getFilteredUrls(request, response),
        summary_url: new URL(`/applications${request.queryString}`, origin),
      })
    }
  }

  /**
   * Returns a middleware that handles a GET request by responding with a JSON payload containing a list of
   * disciplines of study and their application counts.
   * Only disciplines of study with applications are included; omission of a discipline of study means there are
   * zero submitted applications which list that discipline of study.
   */
  @onlyGroups([Group.organisers, Group.admins])
  getApplicationsByDisciplineOfStudy(): Middleware {
    return async (request, response) => {
      const applicationStatusFilter = this.getApplicationStatusFilter(response)
      const rawApplicationStatusFilter = this.getRawApplicationStatusFilter(response)
      const [result, totalApplicationCount] = await Promise.all([
        prisma.$queryRawTyped(
          getApplicationsGroupedByDisciplineOfStudy(
            rawApplicationStatusFilter,
            response.locals.whereOnlyCheckedIn === true,
          ),
        ),
        this.getTotalApplicationCount(applicationStatusFilter, response.locals.whereOnlyCheckedIn === true),
      ])

      const rows = result.map((resultItem) => {
        // counts from postgres $queryRawTyped are `bigint`, which JSON.stringify() doesn't play nice with
        const count = Number(resultItem.count)
        const proportion = this.roundProportion(count / totalApplicationCount)

        return {
          discipline_of_study: resultItem.disciplineOfStudy,
          application_count: count,
          application_proportion: proportion,
          application_percentage: this.formatAsPercentage(proportion),
        }
      })
      response.json({
        data: rows,
        filter_description: this.getFilterDescription(response),
        ...this.getFilteredUrls(request, response),
        summary_url: new URL(`/applications${request.queryString}`, origin),
      })
    }
  }

  /**
   * Returns a middleware that handles a GET request by responding with a JSON payload containing a list of
   * dietary requirements and their application counts.
   * Only dietary requirements with applications are included; omission of a dietary requirement means there are zero
   * applications which list that requirement.
   */
  @onlyGroups([Group.organisers, Group.admins])
  getApplicationsByDietaryRequirement(): Middleware {
    return async (request, response) => {
      const applicationStatusFilter = this.getApplicationStatusFilter(response)
      const rawApplicationStatusFilter = this.getRawApplicationStatusFilter(response)
      const [result, totalApplicationCount] = await Promise.all([
        prisma.$queryRawTyped(
          getApplicationsGroupedByDietaryRequirement(
            rawApplicationStatusFilter,
            response.locals.whereOnlyCheckedIn === true,
          ),
        ),
        this.getTotalApplicationCount(applicationStatusFilter, response.locals.whereOnlyCheckedIn === true),
      ])

      const rows = result.map((resultItem) => {
        // counts coming from postgres $queryRawTyped are `bigint`, which JSON.stringify() doesn't play nice with
        const count = Number(resultItem.count)
        const proportion = this.roundProportion(count / totalApplicationCount)

        return {
          dietary_requirement: resultItem.dietaryRequirement,
          application_count: count,
          application_proportion: proportion,
          application_percentage: this.formatAsPercentage(proportion),
        }
      })
      response.json({
        data: rows,
        filter_description: this.getFilterDescription(response),
        ...this.getFilteredUrls(request, response),
        summary_url: new URL(`/applications${request.queryString}`, origin),
      })
    }
  }

  /**
   * Returns a middleware that handles a GET request by responding with a JSON payload containing a list of
   * gender identities and their application counts.
   * Only gender identities with applications are included; omission of a gender identity means there are zero
   * applications which list that gender identity.
   */
  @onlyGroups([Group.organisers, Group.admins])
  getApplicationsByGenderIdentity(): Middleware {
    return async (request, response) => {
      const applicationStatusFilter = this.getApplicationStatusFilter(response)
      const [result, totalApplicationCount] = await Promise.all([
        prisma.userInfo.groupBy({
          by: ["gender"],
          where: {
            applicationStatus: {
              in: applicationStatusFilter,
            },
            user: response.locals.whereOnlyCheckedIn === true ? { userFlags: this.hasAttendanceFlag() } : undefined,
          },
          _count: {
            userId: true,
          },
        }),
        this.getTotalApplicationCount(applicationStatusFilter, response.locals.whereOnlyCheckedIn === true),
      ])

      const rows = result.map((resultItem) => {
        const proportion = this.roundProportion(resultItem._count.userId / totalApplicationCount)

        return {
          gender_identity: resultItem.gender,
          application_count: resultItem._count.userId,
          application_proportion: proportion,
          application_percentage: this.formatAsPercentage(proportion),
        }
      })

      response.json({
        data: rows,
        filter_description: this.getFilterDescription(response),
        ...this.getFilteredUrls(request, response),
        summary_url: new URL(`/applications${request.queryString}`, origin),
      })
    }
  }
}

const applicationsHandlers = new ApplicationsHandlers()
export { applicationsHandlers }
