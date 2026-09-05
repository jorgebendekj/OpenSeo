import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getProjectForOrganization: vi.fn(),
  updateProject: vi.fn(),
  archiveProject: vi.fn(),
  countProjects: vi.fn(),
}));

vi.mock("@/server/features/projects/repositories/ProjectRepository", () => ({
  ProjectRepository: mocks,
}));

import { getProjectForOrganization, updateProject, archiveProject } from "@/server/features/projects/services/projects";
import { AppError } from "@/server/lib/errors";

describe("Cross-Tenant Isolation Guard Suite", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects reading projects across different organizations", async () => {
    const orgA = "org_alpha_123";
    const orgB = "org_beta_456";
    const projectAId = "proj_alpha_999";

    mocks.getProjectForOrganization.mockImplementation(async (projectId: string, organizationId: string) => {
      if (projectId === projectAId && organizationId === orgA) {
        return {
          id: projectAId,
          organizationId: orgA,
          name: "Alpha Corp",
          domain: "alpha.com",
          locationCode: 2840,
          languageCode: "en",
          createdAt: new Date().toISOString(),
          archivedAt: null,
        } as any;
      }
      return null;
    });

    // Tenant A accessing Tenant A's project succeeds
    const resultA = await getProjectForOrganization(orgA, projectAId);
    expect(resultA.id).toBe(projectAId);

    // Tenant B attempting to access Tenant A's project is denied (NOT_FOUND)
    await expect(getProjectForOrganization(orgB, projectAId)).rejects.toThrow();
  });

  it("prevents updating or modifying projects across tenants", async () => {
    const orgA = "org_alpha_123";
    const orgB = "org_beta_456";
    const projectAId = "proj_alpha_999";

    mocks.updateProject.mockImplementation(
      async (projectId: string, organizationId: string) => {
        if (projectId === projectAId && organizationId === orgA) {
          return {
            id: projectAId,
            organizationId: orgA,
            name: "Updated Corp",
            domain: "alpha.com",
            locationCode: 2840,
            languageCode: "en",
            createdAt: new Date().toISOString(),
          } as any;
        }
        throw new AppError("NOT_FOUND");
      },
    );

    // Tenant B cannot update Tenant A's project
    await expect(
      updateProject(orgB, { projectId: projectAId, name: "Hacked by Org B" }),
    ).rejects.toThrow();
  });

  it("prevents archiving or deleting projects across tenants", async () => {
    const orgA = "org_alpha_123";
    const orgB = "org_beta_456";
    const projectAId = "proj_alpha_999";

    mocks.countProjects.mockResolvedValue(2);
    mocks.archiveProject.mockImplementation(
      async (projectId: string, organizationId: string) => {
        if (projectId === projectAId && organizationId === orgA) {
          return {
            id: projectAId,
            organizationId: orgA,
            name: "Alpha Corp",
            domain: "alpha.com",
            locationCode: 2840,
            languageCode: "en",
            createdAt: new Date().toISOString(),
          } as any;
        }
        throw new AppError("NOT_FOUND");
      },
    );

    // Tenant B cannot archive Tenant A's project
    await expect(
      archiveProject(orgB, { projectId: projectAId }),
    ).rejects.toThrow();
  });
});
