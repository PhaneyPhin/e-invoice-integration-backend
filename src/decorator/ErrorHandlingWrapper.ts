import { Request, Response } from "express";
import { NotFoundException } from "../exception/NotFoundException";
import { EntityNotFoundError } from "typeorm";
import HttpStatusCode from "../enums/httpStatus";
import { UnprocessableEntity } from "../exception/UnprocessableEntity";
import { UnAuthorizedException } from "../exception/UnAuthorizedException";
import { Exception } from "../exception/Exception";

export function ErrorHandlingWrapper(_: any, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response) {
        try {
            return await originalMethod.call(this, req, res);
        } catch (e: any) {
            if (e instanceof NotFoundException || e instanceof EntityNotFoundError) {
                return res.status(HttpStatusCode.NOT_FOUND).send({
                    code: HttpStatusCode.NOT_FOUND,
                    message: e.message
                })
            }

            if (e instanceof UnprocessableEntity) {
                return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).send({
                    code: HttpStatusCode.UNPROCESSABLE_ENTITY,
                    data: e.data,
                    message: 'Data provided is invalid'
                })
            }

            if (e instanceof UnAuthorizedException) {
                return res.status(HttpStatusCode.UNAUTHORIZED).send({
                    code: HttpStatusCode.UNAUTHORIZED,
                    message: e.message
                })
            }

            if (e instanceof Exception) {
                return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).send({
                    code: e.code,
                    message: e.message,
                    data: e.data
                })
            }

            console.error('[error] Unhandled error', e)

            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                code: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: 'Internal server error'
            });
        }
    };

    return descriptor;
}
