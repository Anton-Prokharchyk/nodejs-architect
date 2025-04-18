import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import bodyParser from 'body-parser';

import { TYPES } from './types';
import ILogger from './logger/logger.interface';
import IUserController from './user/userController.interface';
import { IExceptionFilter } from './error/exception.filter.interface';
import { PrismaService } from './database/prisma.service';

@injectable()
export default class App {
	App: Express;
	port: number;

	constructor(
		@inject(TYPES.LoggerService) private LoggerService: ILogger,
		@inject(TYPES.UserController) private UserController: IUserController,
		@inject(TYPES.ExceptionFilter) private ExceptionFilter: IExceptionFilter,
		@inject(TYPES.PrismaService) private PrismaService: PrismaService,
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
		this.useBodyParser();
		this.useRouter();
	}

	useBodyParser(): void {
		this.App.use(bodyParser());
	}

	useRouter(): void {
		this.App.use('/user', this.UserController.router);

		this.App.use(this.ExceptionFilter.catch.bind(this.ExceptionFilter));
	}
}
