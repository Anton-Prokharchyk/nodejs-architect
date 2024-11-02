import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { TYPES } from '../types';
import ILogger from '../logger/logger.interface';
import IUserService from './userService.itreface';
import { UserEntity } from './user.entity';
import { UserRegisterDto } from './dto/userRegister.dto';

@injectable()
export default class UserService implements IUserService {
	constructor(@inject(TYPES.LoggerService) private LoggerService: ILogger) {
		this.LoggerService.logInfo(`UserService successfully initialized`);
	}
	async createUser(dto: UserRegisterDto): Promise<UserEntity | null> {
		const { email, name, password } = dto;
		return new UserEntity(email, name, password);
	}

	async getUserById(id: number): Promise<UserRegisterDto | null> {
		return await new Promise((resolve) => {
			setTimeout(() => {
				resolve({ email: 'email', name: 'name', password: 'password' });
			}, 2000);
		});
	}
}
