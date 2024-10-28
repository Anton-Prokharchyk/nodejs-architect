import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { User } from './user.service';
import BaseController from '../common/base.controller';
import { HttpError } from '../error/http-error.class';
import { TYPES } from '../types';
import ILogger from '../logger/logger.interface';
import IUserService from './userService.itreface';
import IUserController from './userController.interface';

@injectable()
export default class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.LoggerService) private LoggerService: ILogger,
		@inject(TYPES.UserService) private UserService: IUserService,
	) {
		super(LoggerService);

		this.bindRouts([
			{ path: '/error', method: 'get', func: this.getError },
			{ path: '/:id', method: 'get', func: this.getUser },
		]);

		this.LoggerService.logInfo(`UserController successfully initialized`);
	}
	async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id } = req.params;
		const user: User = (await this.UserService.getUser(+id)) as User;
		res.status(200);
		res.setHeader('Content-Type', 'application/json');
		res.send(user);

		return;
	}
	public getError(req: Request, res: Response, next: NextFunction): void {
		throw new HttpError(404, 'User not found', 'UserController');
	}
}
