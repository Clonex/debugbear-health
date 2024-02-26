import { DebugBear } from "debugbear";
import { cliArgs } from "valon-args";

const options = cliArgs({
  debugBearToken: { type: "string", required: true },
  projectId: { type: "string", required: true },
  pageId: { type: "string", required: true },
});

const debugBear = new DebugBear(options.debugBearToken);
const project = await debugBear.projects.get(options.projectId);
const page = project.pages.find((page) => page.id === options.pageId);
const metrics = await debugBear.projects.getPageMetrics(options.projectId);

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

console.log({ page });
