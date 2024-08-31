import App from "./app";
import UserController from "./user/user.controller";
import LoggerService from "./logger/logger.service";
import UserService from "./user/user.service";

const bootstrap = () => {
  const loggerService: LoggerService = new LoggerService();
  const userService: UserService = new UserService(loggerService);
  const userController: UserController = new UserController(
    userService,
    loggerService,
  );
  const server = new App(userController, loggerService);
  server.init();
};

bootstrap();
