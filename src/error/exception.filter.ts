import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { HttpError } from './http-error.class';
import { IExceptionFilter } from './exception.filter.interface';
import ILogger from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.LoggerService) private LoggerService: ILogger) {}

	catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction) {
		if (error instanceof HttpError) {
			this.LoggerService.logError(
				`[${error.context}] Error : ${error.statusCode} ${error.message}`,
			);
			res.status(error.statusCode);
			res.send(error.message);
			return;
		} else {
			this.LoggerService.logError(error.message);
			res.status(500);
			res.send(error.message);
			return;
		}
	}
}
