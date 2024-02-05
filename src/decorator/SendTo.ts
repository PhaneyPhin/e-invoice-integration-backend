import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../enums/httpStatus";

export function SendTo(_: any, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
        const result = await originalMethod.call(this, req, res, next);

        res.status(HttpStatusCode.OK).send(result)
    };

    return descriptor;
}
