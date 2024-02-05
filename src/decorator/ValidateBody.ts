// validation.decorator.ts
import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import HttpStatusCode from '../enums/httpStatus';

export function ValidateBody(dtoClass: any) {
    return function (_: any, __: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
    
        descriptor.value = async function (req: Request, res: Response) {
            try {
              const dtoInstance = plainToInstance(dtoClass, req.body);
              const errors = await validate(dtoInstance);
        
              if (errors.length > 0) {
                return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json({
                  message: 'Validation failed',
                  errors: errors.map(error => ({
                    path: error.property,
                    message: Object.values(error.constraints || {})[0]
                  }))
                })
              }
        
              const result = await originalMethod.call(this, dtoInstance, req.params);
              
              res.status(HttpStatusCode.OK).send(result)
            } catch (error) {
              console.error('Error validating request body:', error);
              res.status(500).json({ message: 'Internal server error' });
            }
          }
    }
}