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
import UserLoginDto from './dto/userLogin.dto';

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
			const newUser = new UserEntity(email, name, password);
			await newUser.setPassword(newUser.password, salt);
			return this.UserRepository.create(newUser);
		} else {
			return null;
		}
	}

	async validateUser(user: UserLoginDto): Promise<boolean> {
		const existUser = await this.UserRepository.find(user.email);
		if (!existUser) {
			return false;
		} else {
			const userEntity = new UserEntity(existUser.name, existUser.email, existUser.password);
			return await userEntity.comparePassword(user.password);
		}
	}

	async getAllUsers(): Promise<Array<UserModel>> {
		return await this.UserRepository.findAll();
	}

	async deleteUser(email: string): Promise<UserModel | null> {
		return await this.UserRepository.delete(email);
	}

	async getUserById(id: number): Promise<UserRegisterDto | null> {
		return await new Promise((resolve) => {
			setTimeout(() => {
				resolve({ email: 'email', name: 'name', password: 'password' });
			}, 2000);
		});
	}
}
