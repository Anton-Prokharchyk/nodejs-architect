import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { PrismaService } from '../database/prisma.service';
import { UserEntity } from './user.entity';
import IUserRepository from './user.repository.interface';
import { TYPES } from '../types';

@injectable()
export default class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaService) private PrismaService: PrismaService) {}
	async create({ email, name, password }: UserEntity): Promise<UserModel> {
		return this.PrismaService.client.userModel.create({
			data: { email, name, password },
		});
	}

	async find(email: string): Promise<UserModel | null> {
		return this.PrismaService.client.userModel.findFirst({ where: { email } });
	}
}
