import { Logger, ILogObj } from 'tslog';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export default class LoggerService {
	logger: Logger<ILogObj>;
	constructor() {
		this.logger = new Logger();
	}

	logInfo(msg: string) {
		this.logger.info(msg);
	}
	logError(msg: string) {
		this.logger.error(msg);
	}
	logWarning(msg: string) {
		this.logger.warn(msg);
	}
}
