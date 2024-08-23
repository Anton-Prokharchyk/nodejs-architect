import UserService, { User } from "./user.service";

export default class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  public getUser(): User {
    return this.userService.getUser();
  }
}
