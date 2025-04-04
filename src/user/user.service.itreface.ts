import { UserModel } from '@prisma/client';

import { UserRegisterDto } from './dto/userRegister.dto';

export default interface IUserService {
	getUserById(id: number): Promise<UserRegisterDto | null>;
	createUser(dto: UserRegisterDto): Promise<UserModel | null>;
}
