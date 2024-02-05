import HttpStatusCode from "../enums/httpStatus";
import { Exception } from "./Exception";

export class NotFoundException extends Exception {
    constructor(message: string = '') {
        super(HttpStatusCode.NOT_FOUND, message)
    }
}