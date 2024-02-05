import HttpStatusCode from "../enums/httpStatus";
import { Exception } from "./Exception";

export class UnprocessableEntity extends Exception {
    public data: any;
    constructor(data: any = '') {
        super(HttpStatusCode.UNPROCESSABLE_ENTITY, '')
        this.data = data
    }
}