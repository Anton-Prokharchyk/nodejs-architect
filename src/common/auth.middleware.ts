import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';

import IMiddleware from './middleware.interface';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			const token = req.headers.authorization?.split(' ')[1];
			if (token && this.secret) {
				verify(token, this.secret, (err, payload) => {
					if (err) {
						next();
					} else if (payload) {
						if (typeof payload === 'object') {
							req.user = payload?.email;
							next();
						}
					}
				});
			}
		} else {
			next();
		}
	}
}
