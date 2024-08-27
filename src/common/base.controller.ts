import { NextFunction, Request, Response, Router } from "express";
import LoggerService from "../logger/logger.service";

export interface IRoute {
  method: keyof Pick<Router, "get" | "post" | "put" | "delete" | "patch">;
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
}

export default abstract class BaseController {
  private readonly _router: Router;
  protected loggerService: LoggerService;

  protected constructor(loggerService: LoggerService) {
    this._router = Router();
    this.loggerService = loggerService;
  }

  protected bindRouts(route: IRoute[]): void {
    route.forEach((route: IRoute) => {
      const handler = route.func.bind(this);
      this._router[route.method](route.path, route.func);
      this.loggerService.logInfo(
        `Route [${route.method}] ${route.path} successfully bound `,
      );
    });
  }
}
