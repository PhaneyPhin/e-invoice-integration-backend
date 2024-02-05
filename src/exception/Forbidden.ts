import HttpStatusCode from "../enums/httpStatus";
import { Exception } from "./Exception";

export class ForbiddenException extends Exception {
    constructor(message: string = '') {
        super(HttpStatusCode.FORBIDDEN, message)
    }
}