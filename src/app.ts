import express, { Express, NextFunction, Request, Response } from "express";
import UserController from "./user/user.controller";
import LoggerService from "./logger/logger.service";

export default class App {
  app: Express;
  port: number;
  userController: UserController;
  loggerService: LoggerService;

  constructor() {
    this.port = 3000;
    this.app = express();
    this.userController = new UserController();
    this.loggerService = new LoggerService();
  }

  init() {
    this.app.listen(this.port, () =>
      this.loggerService.logInfo(`Server started at ", ${this.port} port`),
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
