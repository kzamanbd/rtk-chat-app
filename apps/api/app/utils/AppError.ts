export enum HttpCode {
	OK = 200,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500
}

export class GeneralError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
	}

	getCode() {
		return HttpCode.INTERNAL_SERVER_ERROR;
	}
}

export class BadRequest extends GeneralError {
	constructor(message: string, code: number) {
		super(message);
		this.name = "BadRequest";
	}

	getCode() {
		return HttpCode.BAD_REQUEST;
	}
}

export class NotFound extends GeneralError {
	constructor(message: string) {
		super(message);
		this.name = "NotFound";
	}

	getCode() {
		return HttpCode.NOT_FOUND;
	}
}
