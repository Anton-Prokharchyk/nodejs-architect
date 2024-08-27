import App from "./app";
import UserController from "./user/user.controller";
import LoggerService from "./logger/logger.service";
import UserService from "./user/user.service";

const bootstrap = () => {
  const loggerService: LoggerService = new LoggerService();
  const userService: UserService = new UserService(loggerService);

  const server = new App(
    new UserController(userService, loggerService),
    loggerService,
  );
  server.init();
};

bootstrap();
