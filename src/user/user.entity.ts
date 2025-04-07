import { hash, compare } from 'bcryptjs';

export class UserEntity {
	constructor(
		private _email: string,
		private _name: string,
		private _password: string,
	) {}
	get email(): string {
		return this._email;
	}
	get name(): string {
		return this._name;
	}
	get password(): string {
		return this._password;
	}
	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}
	public async comparePassword(pass: string): Promise<boolean> {
		return compare(pass, this._password);
	}
}
