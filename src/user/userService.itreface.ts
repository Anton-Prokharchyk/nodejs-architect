import { UserRegisterDto } from './dto/userRegister.dto';
import { UserEntity } from './user.entity';

export default interface IUserService {
	getUserById(id: number): Promise<UserRegisterDto | null>;
	createUser(dto: UserRegisterDto): Promise<UserEntity | null>;
}
