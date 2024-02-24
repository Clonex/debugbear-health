import { DebugBear } from "debugbear";
import { cliArgs } from "valon-args";

const options = cliArgs({
  debugBearToken: { type: "string", required: true },
  projectId: { type: "string", required: true },
});

const debugBear = new DebugBear(options.debugBearToken);
const project = await debugBear.projects.get(options.projectId);

console.log(project);
