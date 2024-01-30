import { Catch, RpcExceptionFilter, HttpException } from '@nestjs/common';
import { throwError } from 'rxjs';

@Catch()
export class ExceptionFilter implements RpcExceptionFilter<unknown> {
  catch(exception: unknown) {
    if (exception instanceof HttpException) {
      return throwError({
        statusCode: exception.getStatus(),
        response: exception.getResponse(),
      });
    }

    if (exception instanceof Error) {
      return throwError({
        statusCode: 500,
        response: {
          code: 500,
          message: 'Internal Server Error',
          stack: exception.stack,
        },
      });
    }

    return throwError(exception);
  }
}
