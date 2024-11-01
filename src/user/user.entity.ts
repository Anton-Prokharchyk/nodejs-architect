import bcrypt from 'bcryptjs';
import { HttpError } from '../error/http-error.class';

const salt = 10;

export class UserEntity {
	private _password: string;
	constructor(
		private _email: string,
		private _name: string,
		password: string,
	) {
		this.setPassword(password).catch((err) => new HttpError(500, err.message));
	}
	get _email(): string {
		return this._email;
	}
	get _name(): string {
		return this._name;
	}
	public async setPassword(pass: string): Promise<void> {
		this._password = bcrypt.hash(pass, salt);
	}
}
