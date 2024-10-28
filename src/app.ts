import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { TYPES } from './types';
import ILogger from './logger/logger.interface';
import IUserController from './user/userController.interface';
import { IExceptionFilter } from './error/exception.filter.interface';

@injectable()
export default class App {
	App: Express;
	port: number;

	constructor(
		@inject(TYPES.LoggerService) private LoggerService: ILogger,
		@inject(TYPES.UserController) private UserController: IUserController,
		@inject(TYPES.ExceptionFilter) private ExceptionFilter: IExceptionFilter,
	) {
		this.port = 3000;
		this.App = express();
		this.LoggerService.logInfo(`App successfully initialized`);
	}

	init() {
		this.App.listen(this.port, () =>
			this.LoggerService.logInfo(`Server started at ${this.port} port`),
		);
		this.useRouter();
	}

	useRouter() {
		this.App.use('/user', this.UserController.router);

		this.App.use(this.ExceptionFilter.catch.bind(this.ExceptionFilter));
	}
}
