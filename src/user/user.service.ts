import { inject, injectable } from "inversify";
import "reflect-metadata";

import { TYPES } from "../types";
import ILogger from "../logger/logger.interface";
import IUserService from "./userService.itreface";

export type User = {
  id: number;
  name: string;
  password: string;
};

@injectable()
export default class UserService implements IUserService {
  constructor(@inject(TYPES.LoggerService) private LoggerService: ILogger) {
    this.LoggerService.logInfo(`UserService successfully initialized`);
  }
  async getUser(id: number): Promise<unknown> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ id, name: "name", password: "password" });
      }, 1000);
    });
  }
}
