export type User = {
  name: string;
  password: string;
};

export default class UserService {
  getUser(): User {
    return { name: "name", password: "password" };
  }
}
