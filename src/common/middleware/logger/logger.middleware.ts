import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    //logs time of rqs
    console.log('request timestamp',new Date().toDateString());
    next();
  }
}
