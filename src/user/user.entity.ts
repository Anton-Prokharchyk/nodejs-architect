import { hash, hashSync, compare } from 'bcryptjs';

export class UserEntity {
	private _password: string;
	constructor(
		private salt: number,
		private _email: string,
		private _name: string,
		password: string,
	) {
		this._password = hashSync(password, salt);
	}
	get email(): string {
		return this._email;
	}
	get name(): string {
		return this._name;
	}
	get password(): string {
		return this._password;
	}
	public async setPassword(pass: string): Promise<void> {
		this._password = await hash(pass, this.salt);
	}
	public async comparePassword(pass: string): Promise<boolean> {
		return compare(pass, this._password);
	}
}
