import 'reflect-metadata';
import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import bodyParser from 'body-parser';

import { TYPES } from './types';
import ILogger from './logger/logger.interface';
import IUserController from './user/user.controller.interface';
import IConfigService from './config/config.service.interface';
import { IExceptionFilter } from './error/exception.filter.interface';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/auth.middleware';

@injectable()
export default class App {
	App: Express;
	port: number;
	server: Server;

	constructor(
		@inject(TYPES.LoggerService) private LoggerService: ILogger,
		@inject(TYPES.UserController) private UserController: IUserController,
		@inject(TYPES.ExceptionFilter) private ExceptionFilter: IExceptionFilter,
		@inject(TYPES.PrismaService) private PrismaService: PrismaService,
		@inject(TYPES.ConfigService) private ConfigService: IConfigService,
	) {
		this.port = 3000;
		this.App = express();
		this.LoggerService.logInfo(`App successfully initialized`);
	}

	async init(): Promise<void> {
		this.server = this.App.listen(this.port, () =>
			this.LoggerService.logInfo(`Server started at ${this.port} port`),
		);
		await this.PrismaService.connect();
		this.useMiddlewares();
		this.useRouter();
		this.useExceptionFilters();
	}

	useMiddlewares(): void {
		this.App.use(bodyParser());
		const secret = this.ConfigService.getKey('SECRET');
		if (secret) {
			const authMiddleware = new AuthMiddleware(secret);
			this.App.use(authMiddleware.execute.bind(authMiddleware));
		}
	}

	useExceptionFilters(): void {
		this.App.use(this.ExceptionFilter.catch.bind(this.ExceptionFilter));
	}

	useRouter(): void {
		this.App.use('/user', this.UserController.router);
	}
	public close(): void {
		this.server.close();
	}
}
