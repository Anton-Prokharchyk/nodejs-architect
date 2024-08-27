import UserService, { User } from "./user.service";
import LoggerService from "../logger/logger.service";

export default class UserController {
  userService: UserService;
  loggerService: LoggerService;

  constructor(userService: UserService, loggerService: LoggerService) {
    this.userService = userService;
    this.loggerService = loggerService;
    this.loggerService.logInfo(`UserController successfully initialized`);
  }
  public getUser(): User {
    return this.userService.getUser();
  }
}
