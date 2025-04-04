import { PrismaClient, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { TYPES } from '../types';
import LoggerService from '../logger/logger.service';

@injectable()
export class PrismaService {
	readonly client: PrismaClient;

	constructor(@inject(TYPES.LoggerService) private LoggerService: LoggerService) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.LoggerService.logInfo(`[PrismaService] connected to the database`);
		} catch (e) {
			if (e instanceof Error) {
				this.LoggerService.logError(`[PrismaService] failed to connect to database ${e.message}`);
			}
		}
	}

	async disconnect(): Promise<void> {
		try {
			await this.client.$disconnect();
			this.LoggerService.logInfo(`[PrismaService] disconnected from the database`);
		} catch (e) {
			if (e instanceof Error) {
				this.LoggerService.logError(
					`[PrismaService] failed to disconnect from database ${e.message}`,
				);
			}
		}
	}
}
