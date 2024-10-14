import {
  getApplicationsGroupedByDisciplineOfStudy,
  getApplicationsGroupedByDietaryRequirement,
} from "@prisma/client/sql"

import { Group, onlyGroups } from "@/decorators/authorise"
import type { Middleware } from "@/types"
import { prisma } from "@/database"

class ApplicationsHandlers {
  /**
   * Returns a middleware that handles a GET request by responding with a JSON payload containing summary statistics
   * relating to DurHack applications.
   */
  @onlyGroups([Group.organisers, Group.admins])
  getApplicationsSummary(): Middleware {
    return async (request, response) => {
      const result = await prisma.userInfo.count({
        where: {
          applicationStatus: {
            equals: "submitted",
          },
        },
      })

      response.json({
        data: {
          total_application_count: result
        }
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
      const result = await prisma.userInfo.groupBy({
        by: ['university'],
        where: {
          applicationStatus: {
            equals: "submitted",
          },
        },
        _count: {
          userId: true,
        }
      })

      const rows = result.map((resultItem) => ({
        institution: resultItem.university,
        application_count: resultItem._count.userId,
      }))

      response.json({
        data: rows
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
      const result = await prisma.userInfo.groupBy({
        by: ['levelOfStudy'],
        where: {
          applicationStatus: {
            equals: "submitted",
          },
        },
        _count: {
          userId: true,
        }
      })

      const rows = result.map((resultItem) => ({
        level_of_study: resultItem.levelOfStudy,
        application_count: resultItem._count.userId,
      }))

      response.json({
        data: rows
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
      const result = await prisma.$queryRawTyped(getApplicationsGroupedByDisciplineOfStudy())
      const rows = result.map((resultItem) => ({
        discipline_of_study: resultItem.disciplineOfStudy,
        application_count: Number(resultItem.count)
      }))
      response.json({
        data: rows
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
      const result = await prisma.$queryRawTyped(getApplicationsGroupedByDietaryRequirement())
      const rows = result.map((resultItem) => ({
        dietary_requirement: resultItem.dietaryRequirement,
        application_count: Number(resultItem.count)
      }))
      response.json({
        data: rows
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
      const result = await prisma.userInfo.groupBy({
        by: ['gender'],
        where: {
          applicationStatus: {
            equals: "submitted",
          },
        },
        _count: {
          userId: true,
        }
      })

      const rows = result.map((resultItem) => ({
        gender_identity: resultItem.gender,
        application_count: resultItem._count.userId,
      }))

      response.json({
        data: rows
      })
    }
  }
}

const applicationsHandlers = new ApplicationsHandlers()
export { applicationsHandlers }
