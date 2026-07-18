import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../strategy/jwt.guard.js';
import { type Request } from 'express';
import { UserService } from './user.service.js';
import { User } from '../generated/prisma/client.js';
import { UpdatePasswordDTO } from './dto/update_password.dto.js';

@Controller('user')
@UseGuards(JwtAuthGuard)

export class UserController {
  constructor(private userService: UserService) {}
  @Get('profile')
  getProfile(@Req() req: Request) {
    const user = req.user as User;

    if (!user) {
      throw new UnauthorizedException('hello');
    }
    return this.userService.getProfile(user);
  }
  @Patch('password')
  updatePassword(@Req() req: Request, @Body() dto: UpdatePasswordDTO) {
    const user = req.user as User;
    return this.userService.changePassword(user, dto);
  }
}
