import { NextFunction, Request, Response, Router } from 'express';

import { UserRegisterDto } from './dto/userRegister.dto';

export default interface IUserController {
	get router(): Router;
	registry(req: Request<UserRegisterDto>, res: Response, next: NextFunction): Promise<void>;
	getUser(req: Request, res: Response, next: NextFunction): Promise<void>;
	getError(req: Request, res: Response, next: NextFunction): void;
	getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
}
