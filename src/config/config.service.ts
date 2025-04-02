import { inject, injectable } from 'inversify';
import { config, DotenvConfigOutput } from 'dotenv';

import { TYPES } from '../types';
import ILogger from '../logger/logger.interface';
import IConfigService from './config.service.interface';

@injectable()
export default class ConfigService implements IConfigService {
	readonly configKeys: DotenvConfigOutput;
	constructor(@inject(TYPES.LoggerService) private LoggerService: ILogger) {
		this.configKeys = config();
		if (this.configKeys.error) {
			LoggerService.logInfo('[ConfigService] ERROR load .env config');
		} else {
			LoggerService.logInfo('[ConfigService] loaded .env config');
		}
	}

	public getKey(key: string): string | null {
		if (this.configKeys.parsed) {
			return this.configKeys.parsed[key];
		} else {
			return null;
		}
	}
}
