import { and, desc, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import { samSessions } from "@/db/schema";

type CreateAdaSessionInput = {
  projectId: string;
  userId: string;
};

async function createSession(input: CreateAdaSessionInput) {
  const id = crypto.randomUUID();
  const [row] = await db
    .insert(samSessions)
    .values({
      id,
      projectId: input.projectId,
      userId: input.userId,
    })
    .returning();
  return row;
}

async function listSessionsForProject(projectId: string, userId: string) {
  return db
    .select({
      id: samSessions.id,
      title: samSessions.title,
      createdAt: samSessions.createdAt,
      updatedAt: samSessions.updatedAt,
    })
    .from(samSessions)
    .where(
      and(
        eq(samSessions.projectId, projectId),
        eq(samSessions.userId, userId),
        isNull(samSessions.archivedAt),
      ),
    )
    .orderBy(desc(samSessions.updatedAt), desc(samSessions.id));
}

async function getSessionById(id: string) {
  const [row] = await db
    .select()
    .from(samSessions)
    .where(eq(samSessions.id, id))
    .limit(1);
  return row ?? null;
}

async function getActiveSession(id: string, userId: string) {
  const [row] = await db
    .select()
    .from(samSessions)
    .where(
      and(
        eq(samSessions.id, id),
        eq(samSessions.userId, userId),
        isNull(samSessions.archivedAt),
      ),
    )
    .limit(1);
  return row ?? null;
}

async function setTitle(id: string, title: string) {
  await db
    .update(samSessions)
    .set({ title, updatedAt: new Date().toISOString() })
    .where(eq(samSessions.id, id));
}

async function touch(id: string) {
  await db
    .update(samSessions)
    .set({ updatedAt: new Date().toISOString() })
    .where(eq(samSessions.id, id));
}

async function archiveSession(id: string) {
  await db
    .update(samSessions)
    .set({ archivedAt: new Date().toISOString() })
    .where(eq(samSessions.id, id));
}

export const AdaSessionRepository = {
  createSession,
  listSessionsForProject,
  getSessionById,
  getActiveSession,
  setTitle,
  touch,
  archiveSession,
} as const;

export const SamSessionRepository = AdaSessionRepository;
