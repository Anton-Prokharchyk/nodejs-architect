import { Container, ContainerModule, interfaces } from 'inversify';
import 'reflect-metadata';

import App from './app';
import { TYPES } from './types';
import LoggerService from './logger/logger.service';
import ILogger from './logger/logger.interface';
import UserController from './user/user.controller';
import UserService from './user/user.service';
import IUserService from './user/user.service.itreface';
import { ExceptionFilter } from './error/exception.filter';
import { IExceptionFilter } from './error/exception.filter.interface';
import IUserController from './user/user.controller.interface';
import IConfigService from './config/config.service.interface';
import ConfigService from './config/config.service';
import { PrismaService } from './database/prisma.service';
import UserRepository from './user/user.repository';
import IUserRepository from './user/user.repository.interface';

const AppBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter).inSingletonScope();
	bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
	bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
	bind<App>(TYPES.Application).to(App).inSingletonScope();
});

interface IBootstrapReturn {
	app: App;
	appContainer: Container;
}

const bootstrap = async (): Promise<IBootstrapReturn> => {
	const appContainer = new Container();
	appContainer.load(AppBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { app, appContainer };
};

export const boot = bootstrap();
