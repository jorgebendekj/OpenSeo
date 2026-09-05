import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateArticleInputSchema } from "@/types/schemas/articles";
import { generateArticle } from "@/server/features/articles/services/articleGenerator";
import { articlesRepository } from "@/server/features/articles/repositories/ArticlesRepository";
import { requireProjectContext } from "@/serverFunctions/middleware";

export const generateArticleServerFn = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(generateArticleInputSchema)
  .handler(async ({ data, context }) => {
    return generateArticle(data, {
      domain: context.project.domain,
      projectName: context.project.name,
    });
  });

export const getArticlesServerFn = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(
    z.object({
      projectId: z.string().min(1),
      limit: z.number().optional(),
      offset: z.number().optional(),
    }),
  )
  .handler(async ({ data }) => {
    return articlesRepository.listByProject(data.projectId, {
      limit: data.limit,
      offset: data.offset,
    });
  });

export const getArticleByIdServerFn = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(
    z.object({
      projectId: z.string().min(1),
      articleId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    return articlesRepository.getById(data.articleId, data.projectId);
  });

export const deleteArticleServerFn = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(
    z.object({
      projectId: z.string().min(1),
      articleId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    return articlesRepository.delete(data.articleId, data.projectId);
  });
