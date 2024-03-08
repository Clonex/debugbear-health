import { DebugBear } from "debugbear";
import { getMeasurements } from "./utils.js";

export async function run(
  debugBearToken: string,
  projectId: string,
  pageId: string
) {
  const debugBear = new DebugBear(debugBearToken);
  const project = await debugBear.projects.get(projectId);
  const page = project.pages.find((page) => page.id === pageId);

  const metrics = await getMeasurements(debugBear, pageId, 14);
  if (!page) {
    console.log(
      "Available pages",
      project.pages.map((page) => ({
        id: page.id,
        name: page.name,
      }))
    );
    throw new Error("Page not found!");
  }

  const average =
    metrics.reduce((sum, metric) => sum + metric.score, 0) / metrics.length;

  return { average };
}
