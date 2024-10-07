import { cliArgs } from 'valon-args';
import { run } from './run.js';

const options = cliArgs({
	debugBearToken: { type: 'string', required: true },
});
const projectId = '29163';

const sections = {
	'desktop-full-load': '54392',
	'mobile-full-load': '54402',

	'desktop-no-3rd-party': '57633', // "57633",
	'mobile-no-3rd-party': '57759',
};

const averages = await Promise.all(
	Object.entries(sections).map(async ([name, pageId]) => {
		const { average } = await run(options.debugBearToken, projectId, pageId);

		return `${name}: ${(average * 100).toFixed(2)}`;
	})
);

console.log(averages.join('\n'));
