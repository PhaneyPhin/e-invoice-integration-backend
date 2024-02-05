import HttpStatusCode from "../enums/httpStatus";
import { Exception } from "./Exception";

export class UnAuthorizedException extends Exception {
    constructor(message: string = '') {
        super(HttpStatusCode.UNAUTHORIZED, message)
    }
}