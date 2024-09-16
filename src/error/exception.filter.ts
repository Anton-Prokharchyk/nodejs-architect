import { Request, Response, NextFunction } from "express";

import LoggerService from "../logger/logger.service";
import { IExceptionFilter } from "./exception.filter.interface";
import { HttpError } from "./http-error.class";

export class ExceptionFilter implements IExceptionFilter {
  private readonly logger: LoggerService;
  constructor(loggerService: LoggerService) {
    this.logger = loggerService;
  }

  catch(
    error: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (error instanceof HttpError) {
      this.logger.logError(
        `[${error.context}] Error : ${error.statusCode} ${error.message}`,
      );
      res.status(error.statusCode);
      res.send(error.message);
      return;
    } else {
      this.logger.logError(error.message);
      res.status(500);
      res.send(error.message);
      return;
    }
  }
}
