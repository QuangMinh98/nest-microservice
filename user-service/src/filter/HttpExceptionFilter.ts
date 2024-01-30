import { Catch, RpcExceptionFilter, HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

@Catch(HttpException)
export class HttpExceptionFilter implements RpcExceptionFilter<HttpException> {
  catch(exception: HttpException): Observable<any> {
    return throwError({
      statusCode: exception.getStatus(),
      response: exception.getResponse(),
    });
  }
}
