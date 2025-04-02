import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { TYPES } from '../types';
import ILogger from '../logger/logger.interface';
import IUserService from './userService.itreface';
import { UserEntity } from './user.entity';
import { UserRegisterDto } from './dto/userRegister.dto';
import ConfigService from '../config/config.service';
import IConfigService from '../config/config.service.interface';

@injectable()
export default class UserService implements IUserService {
	constructor(
		@inject(TYPES.LoggerService) private LoggerService: ILogger,
		@inject(TYPES.ConfigService) private ConfigService: IConfigService,
	) {
		this.LoggerService.logInfo(`UserService successfully initialized`);
	}
	async createUser(dto: UserRegisterDto): Promise<UserEntity | null> {
		const { email, name, password } = dto;
		const salt = Number(this.ConfigService.getKey('SALT'));
		return new UserEntity(salt, email, name, password);
	}

	async getUserById(id: number): Promise<UserRegisterDto | null> {
		return await new Promise((resolve) => {
			setTimeout(() => {
				resolve({ email: 'email', name: 'name', password: 'password' });
			}, 2000);
		});
	}
}
