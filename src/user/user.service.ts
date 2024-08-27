import LoggerService from "../logger/logger.service";

export type User = {
  name: string;
  password: string;
};

export default class UserService {
  private loggerService: LoggerService;

  constructor(loggerService: LoggerService) {
    this.loggerService = loggerService;
    this.loggerService.logInfo(`UserController successfully initialized`);
  }
  getUser(): User {
    return { name: "name", password: "password" };
  }
}
