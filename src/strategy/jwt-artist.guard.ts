import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@src/generated/prisma/client.js";
import { Observable } from "rxjs";

export class JwtArtistGuard extends AuthGuard("myJwt"){
    canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{

    return super.canActivate(ctx);
    }
      handleRequest<TUser = User>(err: any, user: any): TUser {
            if(err || !user){
                throw err || new UnauthorizedException();
            }
            if (user.artistId) {
            return user;
            }
            throw err || new UnauthorizedException();
      }

    }
