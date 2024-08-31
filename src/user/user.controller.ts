import UserService, { User } from "./user.service";
import LoggerService from "../logger/logger.service";
import BaseController from "../common/base.controller";
import { NextFunction, Request, Response } from "express";

export default class UserController extends BaseController {
  userService: UserService;
  loggerService: LoggerService;

  constructor(userService: UserService, loggerService: LoggerService) {
    super(loggerService);

    this.userService = userService;
    this.loggerService = loggerService;
    this.bindRouts([{ path: "/:id", method: "get", func: this.getUser }]);

    this.loggerService.logInfo(`UserController successfully initialized`);
  }
  async getUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { id } = req.params;
    const user: User = (await this.userService.getUser(+id)) as User;
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.send(user);

    return;
  }
}
