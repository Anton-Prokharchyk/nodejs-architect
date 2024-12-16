import { Router } from 'express';
import { injectable } from 'inversify';
import 'reflect-metadata';

import ILogger from '../logger/logger.interface';
import IRoute from './route.interface';
import IMiddleware from './middleware.interface';

@injectable()
export default abstract class BaseController {
	private readonly _router: Router;

	constructor(private loggerService: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	protected bindRouts(routes: IRoute[]): void {
		routes.forEach((route: IRoute) => {
			const middlewaresExecs = route.middlewares.map((middleware: IMiddleware) =>
				middleware.execute.bind(middleware),
			);
			const handler = route.func.bind(this);
			this.router[route.method](route.path, middlewaresExecs, handler);
			this.loggerService.logInfo(`Route [${route.method}] ${route.path} successfully bound `);
		});
	}
}
