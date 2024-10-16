import {
  getApplicationsGroupedByDietaryRequirement,
  getApplicationsGroupedByDisciplineOfStudy,
} from "@prisma/client/sql"

import { prisma } from "@/database"
import { Group, onlyGroups } from "@/decorators/authorise"
import type { Middleware } from "@/types"

class ApplicationsHandlers {
  private async getTotalApplicationCount(): Promise<number> {
    return await prisma.userInfo.count({
      where: {
        applicationStatus: {
          equals: "submitted",
        },
      },
    })
  }

  private async getTotalCvCount(): Promise<number> {
    return await prisma.userCV.count()
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
   * Returns a middleware that handles a GET request by responding with a JSON payload containing summary statistics
   * relating to DurHack applications.
   */
  @onlyGroups([Group.organisers, Group.admins])
  getApplicationsSummary(): Middleware {
    return async (request, response) => {
      const [totalApplicationCount, totalCvCount] = await Promise.all([
        this.getTotalApplicationCount(),
        this.getTotalCvCount(),
      ])

      const totalCvProportion = this.roundProportion(totalCvCount / totalApplicationCount)

      response.json({
        data: {
          total_application_count: totalApplicationCount,
          total_cv_count: totalCvCount,
          total_cv_proportion: totalCvProportion,
          total_cv_percentage: this.formatAsPercentage(totalCvProportion),
        },
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
      const [result, totalApplicationCount] = await Promise.all([
        prisma.userInfo.groupBy({
          by: ["university"],
          where: {
            applicationStatus: {
              equals: "submitted",
            },
          },
          _count: {
            userId: true,
          },
        }),
        this.getTotalApplicationCount(),
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
      const [result, totalApplicationCount] = await Promise.all([
        prisma.userInfo.groupBy({
          by: ["levelOfStudy"],
          where: {
            applicationStatus: {
              equals: "submitted",
            },
          },
          _count: {
            userId: true,
          },
        }),
        this.getTotalApplicationCount(),
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
      const [result, totalApplicationCount] = await Promise.all([
        prisma.$queryRawTyped(getApplicationsGroupedByDisciplineOfStudy()),
        this.getTotalApplicationCount(),
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
      const [result, totalApplicationCount] = await Promise.all([
        prisma.$queryRawTyped(getApplicationsGroupedByDietaryRequirement()),
        this.getTotalApplicationCount(),
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
      const [result, totalApplicationCount] = await Promise.all([
        prisma.userInfo.groupBy({
          by: ["gender"],
          where: {
            applicationStatus: {
              equals: "submitted",
            },
          },
          _count: {
            userId: true,
          },
        }),
        this.getTotalApplicationCount(),
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
      })
    }
  }
}

const applicationsHandlers = new ApplicationsHandlers()
export { applicationsHandlers }
