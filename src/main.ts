import App from "./app";
import UserController from "./user/user.controller";
import LoggerService from "./logger/logger.service";
import UserService from "./user/user.service";
import { ExceptionFilter } from "./error/exception.filter";

const bootstrap = () => {
  const loggerService: LoggerService = new LoggerService();
  const userService: UserService = new UserService(loggerService);
  const exceptionFilter: ExceptionFilter = new ExceptionFilter(loggerService);

  const server = new App(
    new UserController(userService, loggerService),
    loggerService,
    exceptionFilter,
  );
  server.init();
};

bootstrap();
