import {
  Catch,
  RpcExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

@Catch(Error)
export class InternalExceptionFilter
  implements RpcExceptionFilter<InternalServerErrorException>
{
  catch(exception: Error): Observable<any> {
    console.error(exception);
    return throwError({
      statusCode: 500,
      response: {
        code: 500,
        message: 'Internal Server Error',
        stack: exception.stack,
      },
    });
  }
}
