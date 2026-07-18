import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import { PayloadType } from "../artist/types.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "myJwt"){
    constructor(private prisma: PrismaService){
        const Secret = process.env.ACCESS_TOKEN_SECRET;
        if(!Secret){
            throw new InternalServerErrorException('env var missing')
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: Secret,

        })
    }
  async validate(payload: PayloadType) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.tokenVersion !== payload.tokenVersion) {
      throw new UnauthorizedException('Token version mismatch');
    }
    return user;
  }
}
