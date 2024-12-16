import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import BaseController from '../common/base.controller';
import { HttpError } from '../error/http-error.class';
import { TYPES } from '../types';
import ILogger from '../logger/logger.interface';
import IUserService from './userService.itreface';
import IUserController from './userController.interface';
import { UserRegisterDto } from './dto/userRegister.dto';

@injectable()
export default class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.LoggerService) private LoggerService: ILogger,
		@inject(TYPES.UserService) private UserService: IUserService,
	) {
		super(LoggerService);

		this.bindRouts([
			{ path: '/error', method: 'get', func: this.getError, middlewares: [] },
			{ path: '/:id', method: 'get', func: this.getUser, middlewares: [] },
			{ path: '/registry', method: 'post', func: this.registry, middlewares: [] },
		]);

		this.LoggerService.logInfo(`UserController successfully initialized`);
	}

	async registry(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { email, name, password } = req.body;
		const newUser = await this.UserService.createUser({ email, name, password });
		if (!newUser) res.status(400).send({ message: 'Bad request' });
		if (newUser)
			res.status(200).send({
				id: newUser.id,
				name: newUser.name,
				email: newUser.email,
				password: newUser.password,
			});
	}
	async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id } = req.params;
		const user: UserRegisterDto | null = await this.UserService.getUserById(+id);
		if (user) {
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.send(user);
			return;
		}
		res.status(404);
		res.end({ code: '404', message: 'User not found' });
		return;
	}
	public getError(req: Request, res: Response, next: NextFunction): void {
		throw new HttpError(404, 'User not found', 'UserController');
	}
}
