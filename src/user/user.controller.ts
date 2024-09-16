import { NextFunction, Request, Response } from "express";

import UserService, { User } from "./user.service";
import LoggerService from "../logger/logger.service";
import BaseController from "../common/base.controller";
import { HttpError } from "../error/http-error.class";

export default class UserController extends BaseController {
  userService: UserService;
  loggerService: LoggerService;

  constructor(userService: UserService, loggerService: LoggerService) {
    super(loggerService);

    this.userService = userService;
    this.loggerService = loggerService;
    this.bindRouts([
      { path: "/error", method: "get", func: this.getError },
      { path: "/:id", method: "get", func: this.getUser },
    ]);

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
  public getError(req: Request, res: Response, next: NextFunction): void {
    throw new HttpError(404, "User not found", "UserController");
  }
}
