import supertest from 'supertest';

import App from '../src/app';
import { boot } from '../src/main';

let application: App;
let token: string;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('User e2e', () => {
	it('register - error , no password', async () => {
		const res = await supertest.agent(application.App).post('/user/registry').send({
			email: 'email',
			name: 'name',
		});
		expect(res.status).toEqual(422);
	});
	it('register - error , no name', async () => {
		const res = await supertest.agent(application.App).post('/user/registry').send({
			email: 'email',
			password: 'password',
		});
		expect(res.status).toEqual(422);
	});
	it('register - error , no email', async () => {
		const res = await supertest.agent(application.App).post('/user/registry').send({
			name: 'name',
			password: 'password',
		});
		expect(res.status).toEqual(422);
	});
	it('register - success', async () => {
		const res = await supertest.agent(application.App).post('/user/registry').send({
			name: 'name123',
			email: 'email123@email.com',
			password: 'password123',
		});
		expect(res.status).toEqual(200);
		expect(res.body.newUser.email).toEqual('email123@email.com');
		expect(res.body.token).toBeTruthy();
	});
	it('register - error, user already exist', async () => {
		const res = await supertest.agent(application.App).post('/user/registry').send({
			name: 'name123',
			email: 'email123@email.com',
			password: 'password123',
		});
		expect(res.status).toEqual(400);
	});

	it('login - error , no email', async () => {
		const res = await supertest.agent(application.App).post('/user/login').send({
			password: 'password',
		});
		expect(res.status).toEqual(422);
	});
	it('login - error , incorrect email', async () => {
		const res = await supertest.agent(application.App).post('/user/login').send({
			email: 'email',
			password: 'password',
		});
		expect(res.status).toEqual(422);
	});
	it('login - error , no pass', async () => {
		const res = await supertest.agent(application.App).post('/user/login').send({
			email: 'email123@email.com',
		});
		expect(res.status).toEqual(422);
	});
	it('login - error , wrong pass', async () => {
		const res = await supertest.agent(application.App).post('/user/login').send({
			email: 'email123@email.com',
			password: 'password',
		});
		expect(res.status).toEqual(422);
	});
	it('login - success ', async () => {
		const res = await supertest.agent(application.App).post('/user/login').send({
			email: 'email123@email.com',
			password: 'password123',
		});
		expect(res.status).toEqual(200);
		expect(res.body.token).toBeTruthy();
	});

	it('delete - error, no user ', async () => {
		const res = await supertest.agent(application.App).post('/user/delete').send({
			email: 'email12@email.com',
			password: 'password123',
		});
		expect(res.status).toEqual(404);
	});
	it('delete - success ', async () => {
		const res = await supertest.agent(application.App).post('/user/delete').send({
			email: 'email123@email.com',
			password: 'password123',
		});
		expect(res.status).toEqual(200);
	});
});

afterAll(() => {
	application.close();
});
