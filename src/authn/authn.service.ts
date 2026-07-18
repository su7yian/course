import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto.js';
import { UserService } from '../user/user.service.js';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ArtistService } from '../artist/artist.service.js';
import { PayloadType } from '../artist/types.js';
import { User } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { SignupDTO } from './dto/signup.dto.js';
import { createHash } from 'crypto';

@Injectable()
export class AuthnService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private artistService: ArtistService,
    private prisma: PrismaService,
  ) {}

  private async generateTokens(user: User) {
    const newTokenVersion = user.tokenVersion + 1;
    const payload: PayloadType = {
      sub: user.id,
      email: user.email,
      tokenVersion: newTokenVersion,
    };
    const artist = await this.artistService.findArtist(user.id);

    if (artist) {
      payload.artistId = artist.id;
    }

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '15m',
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '7d',
    });
    const hashed = createHash('sha256').update(refresh_token).digest('hex');
    const update = await this.prisma.user.updateMany({
      // prevent concurrent updates by checking tokenVersion is not modified by another request
      where: { email: user.email, tokenVersion: user.tokenVersion },
      data: { refreshToken: hashed, tokenVersion: newTokenVersion },
    });
    // count returns how many where matches found, should be 1, if not, another request updated the tokenVersion before this one
    if (update.count !== 1) {
      throw new ConflictException('concurrent token generation detected. Please try again');
    }
    return { access_token, refresh_token };
  }

  async login(
    dto: LoginDTO,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.userService.findOne(dto);
    const matchPassword = await bcrypt.compare(dto.password, user.password);
    if (!matchPassword) {
      throw new UnauthorizedException('password is wrong');
    }

    return this.generateTokens(user);
  }

  async signup(
    dto: SignupDTO,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const hash = await bcrypt.hash(dto.password, 10);
    const user: User = await this.prisma.user.create({
      data: {
        ...dto,
        password: hash,
      },
    });
    return this.generateTokens(user);
  }

  async refresh(
    user: User,
  ): Promise<{ access_token: string; refresh_token: string }> {
    return this.generateTokens(user);
  }
}
