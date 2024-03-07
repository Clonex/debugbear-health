import { DebugBear } from "debugbear";

export async function getMeasurements(
  debugBear: DebugBear,
  projectId: string,
  daysBack = 14
) {
  const targetDate = new Date();
  targetDate.setUTCDate(targetDate.getUTCDate() - daysBack);

  let ret: { score: number; measuredAt: Date }[] = [];
  let firstDate: Date | undefined;
  do {
    console.log({
      before: firstDate,
    });
    const measurements = await debugBear.projects.getPageMetrics(projectId, {
      before: firstDate,
    });
    console.log(measurements.map((d) => d.metrics?.["analysis.date"]));
    for (const measurement of measurements) {
      if (!measurement?.metrics) {
        continue;
      }

      ret.push({
        score: measurement.metrics["performance.score"],
        measuredAt: new Date(measurement.metrics["analysis.date"]),
      });

      ret = ret.sort((a, b) => a.measuredAt.getTime() - b.measuredAt.getTime());

      firstDate = ret[0].measuredAt;

      if (ret.length > 120) {
        throw new Error("Huh");
      }
    }
  } while (ret.length === 0 || ret[ret.length - 1].measuredAt > targetDate);

  return ret;
}
