import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { PayloadType } from '../artist/types.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { createHash } from 'crypto';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'refresh_jwt',
) {
  // this strategy will only be applied to request cotainign refresh token in auth header so it will verify that against secret for refresh
  constructor(private prisma: PrismaService) {
    const Secret = process.env.REFRESH_TOKEN_SECRET;
    if (!Secret) {
      throw new InternalServerErrorException('env var missing');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Secret,
      passReqToCallback: true, // passes request to vlaidate fucntion below
    });
  }
  async validate(req: Request, payload: PayloadType) {
    const refresh_token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (!user) {
      throw new NotFoundException('Not Found');
    }
    if (!refresh_token || !user.refreshToken) {
      throw new UnauthorizedException();
    }
    const incomingHash = createHash('sha256')
      .update(refresh_token)
      .digest('hex');
    if (incomingHash !== user.refreshToken) {
      throw new UnauthorizedException('refetch refresh token');
    }
    return user;
  }
}
