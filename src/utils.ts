import { DebugBear } from 'debugbear';

interface DebugBearMetric {
	'analysis.date': string;
	'performance.score': number;
}

export function daysAgo(days: number, startDate = new Date()): Date {
	const date = new Date(startDate);
	date.setDate(date.getDate() - days);

	return date;
}

const MEASUREMENT_DAYS_PAGE_SIZE = 2;
export async function getMeasurements(debugBear: DebugBear, pageId: string, daysBack = 14) {
	const targetDate = daysAgo(daysBack);

	let ret: { score: number; measuredAt: Date }[] = [];
	let interval = {
		from: daysAgo(MEASUREMENT_DAYS_PAGE_SIZE),
		to: new Date(),
	};

	do {
		const currentPage: DebugBearMetric[] = await debugBear.pages.getMetrics(pageId, interval);
		for (const measurement of currentPage) {
			ret.push({
				score: measurement['performance.score'],
				measuredAt: new Date(measurement['analysis.date']),
			});
		}
		ret = ret.sort((a, b) => a.measuredAt.getTime() - b.measuredAt.getTime());

		if (ret.length > 0) {
			interval.to = new Date(ret[0].measuredAt);
		} else {
			interval.to = daysAgo(MEASUREMENT_DAYS_PAGE_SIZE, interval.to);
		}
		interval.from = daysAgo(MEASUREMENT_DAYS_PAGE_SIZE, interval.to);
	} while (ret.length === 0 || ret[0].measuredAt > targetDate);

	return ret;
}
