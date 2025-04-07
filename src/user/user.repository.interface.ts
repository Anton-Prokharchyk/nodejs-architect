import { UserModel } from '@prisma/client';

import { UserEntity } from './user.entity';

export default interface IUserRepository {
	create: (UserEntity: UserEntity) => Promise<UserModel>;

	find: (email: string) => Promise<UserModel | null>;

	findAll: () => Promise<Array<UserModel>>;
}
