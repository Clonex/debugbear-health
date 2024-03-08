import { cliArgs } from 'valon-args';
import { run } from './run.js';

const options = cliArgs({
	debugBearToken: { type: 'string', required: true },
	projectId: { type: 'string', required: true },
	pageId: { type: 'string', required: true },
});

const { average } = await run(options.debugBearToken, options.projectId, options.pageId);
console.log(average);
