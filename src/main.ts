import { Container, ContainerModule, interfaces } from 'inversify';
import 'reflect-metadata';

import App from './app';
import { TYPES } from './types';
import LoggerService from './logger/logger.service';
import ILogger from './logger/logger.interface';
import UserController from './user/user.controller';
import UserService from './user/user.service';
import IUserService from './user/userService.itreface';
import { ExceptionFilter } from './error/exception.filter';
import { IExceptionFilter } from './error/exception.filter.interface';
import IUserController from './user/userController.interface';
import IConfigService from './config/config.service.interface';
import ConfigService from './config/config.service';

const AppBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter).inSingletonScope();
	bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
	bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<App>(TYPES.Application).to(App).inSingletonScope();
});

const bootstrap = () => {
	const AppContainer = new Container();
	AppContainer.load(AppBindings);
	const server = AppContainer.get<App>(TYPES.Application);
	server.init();
	return { server, AppContainer };
};

export const { server, AppContainer } = bootstrap();
