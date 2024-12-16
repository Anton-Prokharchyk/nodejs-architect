import { NextFunction, Request, Response, Router } from 'express';

import IMiddleware from './middleware.interface';

export default interface IRoute {
	method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	middlewares: IMiddleware[];
}
