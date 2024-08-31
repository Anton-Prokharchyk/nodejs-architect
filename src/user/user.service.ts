import LoggerService from "../logger/logger.service";

export type User = {
  id: number;
  name: string;
  password: string;
};

export default class UserService {
  private loggerService: LoggerService;

  constructor(loggerService: LoggerService) {
    this.loggerService = loggerService;

    this.loggerService.logInfo(`UserService successfully initialized`);
  }
  async getUser(id: number): Promise<unknown> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ id, name: "name", password: "password" });
      }, 1000);
    });
  }
}
