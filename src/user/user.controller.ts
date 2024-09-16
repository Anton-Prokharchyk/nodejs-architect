import { NextFunction, Request, Response } from "express";

import UserService, { User } from "./user.service";
import LoggerService from "../logger/logger.service";
import BaseController from "../common/base.controller";
import { HttpError } from "../error/http-error.class";

export default class UserController extends BaseController {
  private userService: UserService;

  constructor(userService: UserService, loggerService: LoggerService) {
    super(loggerService);
    this.userService = userService;
    this.bindRouts([{ path: "/user", method: "get", func: this.getUser }]);

    this.loggerService.logInfo(`UserController successfully initialized`);
  }
  public getUser(): User {
    return this.userService.getUser();
  }
  public getError(): void {
    throw new HttpError(404, "User not found", "UserController");
  }
}
