import { Response } from 'express';
import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch()
export class ExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const responseData = exception.getResponse();

      return response.status(statusCode).send({
        status: 'error',
        data: null,
        error: responseData,
      });
    }

    if (exception instanceof Error) {
      return response.status(500).send({
        status: 'error',
        data: null,
        error: {
          code: 500,
          message: 'Internal Server Error',
          stack: exception.stack,
        },
      });
    }

    if (
      exception instanceof Object &&
      'statusCode' in exception &&
      'response' in exception &&
      typeof exception.statusCode === 'number'
    ) {
      return response.status(exception.statusCode).send({
        status: 'error',
        data: null,
        error: exception.response,
      });
    }

    return response.status(402).send(exception);
  }
}
