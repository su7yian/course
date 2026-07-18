import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDTO } from '../authn/dto/login.dto.js';
import { UpdatePasswordDTO } from './dto/update_password.dto.js';
import bcrypt from 'bcryptjs';
import { error } from 'node:console';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getProfile(user: User) {
    return this.prisma.user.findUnique({
      where: { email: user.email },
      select: { id: true, firstName: true, lastName: true, email: true },
    });
  }
  async changePassword(user: User, dto: UpdatePasswordDTO) {
    const matched = await bcrypt.compare(dto.old_password, user.password);
    if (!matched) {
      throw new error('Incorrect password');
    }
    const hashed_new_password = await bcrypt.hash(dto.new_password, 10);
    await this.prisma.user.update({
      where: { email: user.email },
      data: {
        password: hashed_new_password,
        refreshToken: null,
        tokenVersion: { increment: 1 },
      },
    });
    return 'Password updated succesfully!';
  }

  async findOne(dto: LoginDTO): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new UnauthorizedException('user does not exist');
    }
    return user;
  }
}
