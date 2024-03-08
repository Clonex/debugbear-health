import { DebugBear } from "debugbear";
import { cliArgs } from "valon-args";
import { daysAgo, getMeasurements } from "./utils.js";

const options = cliArgs({
  debugBearToken: { type: "string", required: true },
  projectId: { type: "string", required: true },
  pageId: { type: "string", required: true },
});

const debugBear = new DebugBear(options.debugBearToken);
const project = await debugBear.projects.get(options.projectId);
const page = project.pages.find((page) => page.id === options.pageId);

const testPage = await debugBear.pages.getMetrics(options.pageId, {
  from: daysAgo(1),
  to: new Date(),
});

const metrics = await getMeasurements(debugBear, options.pageId, 14);
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

console.log(average);
