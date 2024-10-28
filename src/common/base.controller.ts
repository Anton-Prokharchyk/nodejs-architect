import { NextFunction, Request, Response, Router } from 'express';
import { injectable } from 'inversify';
import 'reflect-metadata';

import ILogger from '../logger/logger.interface';

export interface IRoute {
	method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
}

@injectable()
export default abstract class BaseController {
	private readonly _router: Router;

	constructor(private loggerService: ILogger) {
		this._router = Router();
	}

	get router() {
		return this._router;
	}

	protected bindRouts(route: IRoute[]): void {
		route.forEach((route: IRoute) => {
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
			this.loggerService.logInfo(`Route [${route.method}] ${route.path} successfully bound `);
		});
	}
}
