import { createFileRoute } from "@tanstack/react-router";
import { ArticlesPage } from "@/client/features/articles/ArticlesPage";

export const Route = createFileRoute("/_project/p/$projectId/articles")({
  component: ArticlesRoute,
});

function ArticlesRoute() {
  const { projectId } = Route.useParams();
  return <ArticlesPage projectId={projectId} />;
}
