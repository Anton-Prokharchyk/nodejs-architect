import express, { Express } from "express";

import UserController from "./user/user.controller";
import LoggerService from "./logger/logger.service";
import { ExceptionFilter } from "./error/exception.filter";

export default class App {
  app: Express;
  port: number;
  private readonly userController: UserController;
  private readonly loggerService: LoggerService;
  private readonly exceptionFilter: ExceptionFilter;

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
    this.useRouter();
  }

  useRouter() {
    this.app.use("/user", this.userController.router);

    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }
}
