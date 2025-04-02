import { DotenvConfigOutput } from 'dotenv';

export default interface IConfigService {
	configKeys: DotenvConfigOutput;
	getKey: (key: string) => string | null;
}
