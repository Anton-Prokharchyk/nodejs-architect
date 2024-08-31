import express, { Express } from "express";

import UserController from "./user/user.controller";
import LoggerService from "./logger/logger.service";

export default class App {
  app: Express;
  port: number;
  private userController: UserController;
  private loggerService: LoggerService;

  constructor(userController: UserController, loggerService: LoggerService) {
    this.port = 3000;
    this.app = express();
    this.userController = userController;
    this.loggerService = loggerService;

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
  }
}
