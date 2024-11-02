import { NextFunction, Request, Response, Router } from 'express';

export default interface IUserController {
	get router(): Router;
	registry(req: Request, res: Response, next: NextFunction): Promise<void>;
	getUser(req: Request, res: Response, next: NextFunction): Promise<void>;
	getError(req: Request, res: Response, next: NextFunction): void;
}
