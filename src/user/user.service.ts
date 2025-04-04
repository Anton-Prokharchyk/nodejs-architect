import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { TYPES } from '../types';
import ILogger from '../logger/logger.interface';
import IUserService from './user.service.itreface';
import { UserEntity } from './user.entity';
import { UserRegisterDto } from './dto/userRegister.dto';
import IConfigService from '../config/config.service.interface';
import IUserRepository from './user.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
export default class UserService implements IUserService {
	constructor(
		@inject(TYPES.LoggerService) private LoggerService: ILogger,
		@inject(TYPES.ConfigService) private ConfigService: IConfigService,
		@inject(TYPES.UserRepository) private UserRepository: IUserRepository,
	) {
		this.LoggerService.logInfo(`UserService successfully initialized`);
	}
	async createUser(dto: UserRegisterDto): Promise<UserModel | null> {
		const { email, name, password } = dto;
		const isUserExist = await this.UserRepository.find(email);
		if (!isUserExist) {
			const salt = Number(this.ConfigService.getKey('SALT'));
			const newUser = new UserEntity(salt, email, name, password);
			return this.UserRepository.create(newUser);
		} else {
			return null;
		}
	}

	async getUserById(id: number): Promise<UserRegisterDto | null> {
		return await new Promise((resolve) => {
			setTimeout(() => {
				resolve({ email: 'email', name: 'name', password: 'password' });
			}, 2000);
		});
	}
}
