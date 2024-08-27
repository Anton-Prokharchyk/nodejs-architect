import express, { Express, NextFunction, Request, Response } from "express";

import UserController from "./user/user.controller";
import LoggerService from "./logger/logger.service";

export default class App {
  app: Express;
  port: number;
  private userController: UserController;
  private loggerService: LoggerService;

  constructor(userController: UserController, LoggerService: LoggerService) {
    this.port = 3000;
    this.app = express();
    this.userController = userController;
    this.loggerService = LoggerService;
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
        const user = this.userController.getUser();
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.send(user);
      },
    );
  }
}
