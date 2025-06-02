import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	verbose: true,
	preset: 'ts-jest',
	// rootDir: './e2e-tests',
	testRegex: '.e2e-spec.ts$',
	coverageDirectory: './src',
};

export default config;
