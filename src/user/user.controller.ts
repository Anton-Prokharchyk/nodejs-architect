type User = {
  name: string;
  password: string;
};

export default class UserService {
  static getUser(): User {
    return { name: "name", password: "password" };
  }
}
