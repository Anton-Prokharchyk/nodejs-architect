import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import bodyParser from 'body-parser';

import { TYPES } from './types';
import ILogger from './logger/logger.interface';
import IUserController from './user/userController.interface';
import { IExceptionFilter } from './error/exception.filter.interface';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/auth.middleware';
import IConfigService from './config/config.service.interface';

@injectable()
export default class App {
	App: Express;
	port: number;

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

	init(): void {
		this.App.listen(this.port, () =>
			this.LoggerService.logInfo(`Server started at ${this.port} port`),
		);
		this.PrismaService.connect();
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
}
