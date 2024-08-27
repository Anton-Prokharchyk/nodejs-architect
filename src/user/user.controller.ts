import UserService, { User } from "./user.service";
import LoggerService from "../logger/logger.service";
import BaseController from "../common/base.controller";

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
}
