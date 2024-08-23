import express, { Express, NextFunction, Request, Response } from "express";

export default class App {
  app: Express;
  port: number;

  constructor() {
    this.port = 3000;
    this.app = express();
  }

  async init() {
    await this.app.listen(this.port);
    this.router();
  }

  router() {
    this.app.use(
      "/users",
      (req: Request, res: Response, next: NextFunction) => {
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.send({
          name: "name",
          password: "password",
        });
      },
    );
  }
}
