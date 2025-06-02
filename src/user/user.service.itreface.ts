import { UserModel } from '@prisma/client';

import { UserRegisterDto } from './dto/userRegister.dto';
import UserLoginDto from './dto/userLogin.dto';

export default interface IUserService {
	getUserById(id: number): Promise<UserRegisterDto | null>;
	createUser(dto: UserRegisterDto): Promise<UserModel | null>;
	getAllUsers(): Promise<Array<UserModel>>;
	validateUser(dto: UserLoginDto): Promise<boolean>;
	deleteUser(email: string): Promise<UserModel | null>;
}
