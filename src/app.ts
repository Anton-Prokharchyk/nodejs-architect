import express, { Express, NextFunction, Request, Response } from "express";

import UserController from "./user/user.controller";
import LoggerService from "./logger/logger.service";
import { ExceptionFilter } from "./error/exception.filter";

export default class App {
  app: Express;
  port: number;
  private userController: UserController;
  private loggerService: LoggerService;
  private exceptionFilter: ExceptionFilter;

  constructor(
    UserController: UserController,
    LoggerService: LoggerService,
    ExceptionFilter: ExceptionFilter,
  ) {
    this.port = 3000;
    this.app = express();
    this.userController = UserController;
    this.loggerService = LoggerService;
    this.exceptionFilter = ExceptionFilter;
    this.loggerService.logInfo(`App successfully initialized`);
  }

  init() {
    this.app.listen(this.port, () =>
      this.loggerService.logInfo(`Server started at ${this.port} port`),
    );
    this.router();
  }

  router() {
    this.app.use(
      "/users",
      (req: Request, res: Response, next: NextFunction) => {
        this.userController.getError();
        const user = this.userController.getUser();
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.send(user);
      },
    );

    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }
}
