import { IsDefined, IsNotEmpty } from 'class-validator';

export class UserRegisterDto {
	@IsDefined()
	@IsNotEmpty()
	email: string;
	@IsDefined()
	@IsNotEmpty()
	name: string;
	@IsDefined()
	@IsNotEmpty()
	password: string;
}
