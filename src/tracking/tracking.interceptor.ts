import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Types } from 'mongoose';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ToObjectIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request=context.switchToHttp().getRequest();
     request.params.id=new Types.ObjectId(request.params.id);

     return next
      .handle()
      .pipe(
        tap(() => console.log(`chanegd to object id`)),
      ); 
  }
}