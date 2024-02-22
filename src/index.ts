import { DebugBear } from "debugbear";

const GG_PROJECT = "";

const debugBear = new DebugBear("mKMFElPHuKo8YW16GNW8NJzDZ");
const project = await debugBear.projects.get(GG_PROJECT);

console.log(project);
