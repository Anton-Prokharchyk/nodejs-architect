import bcrypt from 'bcryptjs';

import { getId } from '../utility/getId';

const salt = 10;

export class UserEntity {
	private _password: string;
	private readonly _id: string;
	constructor(
		private _email: string,
		private _name: string,
		password: string,
	) {
		this._password = bcrypt.hashSync(password, salt);
		this._id = getId();
	}
	get email(): string {
		return this._email;
	}
	get name(): string {
		return this._name;
	}
	get id(): string {
		return this._id;
	}
	get password(): string {
		return this._password;
	}
	public async setPassword(pass: string): Promise<void> {
		this._password = await bcrypt.hash(pass, salt);
	}
}
