import 'reflect-metadata';
import { Container } from 'inversify';
import { UserModel } from '@prisma/client';

import { TYPES } from '../types';
import ILogger from '../logger/logger.interface';
import IConfigService from '../config/config.service.interface';
import IUserRepository from './user.repository.interface';
import IUserService from './user.service.itreface';
import UserService from './user.service';

const container = new Container();

const configServiceMock: IConfigService = {
	configKeys: { parsed: { name: 'key' } },
	getKey: jest.fn(),
};

const loggerServiceMock: ILogger = {
	logInfo: jest.fn(),
	logError: jest.fn(),
	logWarning: jest.fn(),
};

const userRepositoryMock: IUserRepository = {
	create: jest.fn(),
	find: jest.fn(),
	findAll: jest.fn(),
	delete: jest.fn(),
};

let loggerService: ILogger;
let configService: IConfigService;
let userRepository: IUserRepository;
let userService: IUserService;

beforeAll(() => {
	container.bind<ILogger>(TYPES.LoggerService).toConstantValue(loggerServiceMock);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(configServiceMock);
	container.bind<IUserRepository>(TYPES.UserRepository).toConstantValue(userRepositoryMock);
	container.bind<IUserService>(TYPES.UserService).to(UserService);

	loggerService = container.get<ILogger>(TYPES.LoggerService);
	configService = container.get<IConfigService>(TYPES.ConfigService);
	userRepository = container.get<IUserRepository>(TYPES.UserRepository);
	userService = container.get<IUserService>(TYPES.UserService);
});

let createdUser: UserModel | null;

describe('test userService', () => {
	it('create user', async () => {
		configService.getKey = jest.fn().mockReturnValueOnce('1');
		loggerService.logInfo = jest.fn().mockImplementationOnce((): void => {
			console.log('logInfo');
		});
		userRepository.create = jest
			.fn()
			.mockImplementationOnce((userModel: UserModel): UserModel => userModel);
		userRepository.find = jest.fn().mockImplementationOnce((): null => null);
		createdUser = await userService.createUser({
			email: 'email@email.com',
			password: '12341234123',
			name: 'name',
		});
		expect(createdUser?.password).not.toEqual('12341234123');
		expect(createdUser?.name).toEqual('name');
	});
	it('validate user success', async () => {
		userRepository.find = jest.fn().mockImplementationOnce((): UserModel | null => createdUser);

		const isValid = await userService.validateUser({
			email: 'email@email.com',
			password: '12341234123',
		});
		expect(isValid).toBeTruthy();
	});
	it('validate user wrong password', async () => {
		userRepository.find = jest.fn().mockImplementationOnce((): UserModel | null => createdUser);
		const isValid = await userService.validateUser({
			email: 'email@email.com',
			password: 'password1234',
		});
		expect(isValid).toBeFalsy();
	});
	it('validate wrong user', async () => {
		userRepository.find = jest.fn().mockImplementationOnce((): UserModel | null => null);
		const isValid = await userService.validateUser({
			email: 'email@email.com',
			password: '12341234123',
		});
		expect(isValid).toBeFalsy();
	});
});
