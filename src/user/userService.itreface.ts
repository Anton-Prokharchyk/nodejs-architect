export default interface IUserService {
	getUser(id: number): Promise<unknown>;
}
