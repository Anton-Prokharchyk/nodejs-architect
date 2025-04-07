import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class UserLoginDto {
	@IsNotEmpty()
	@IsEmail({}, { message: 'invalid email' })
	email: string;
	@IsNotEmpty()
	@IsString()
	password: string;
}
