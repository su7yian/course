import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService], //other modules can inject prism aservices directly.
})
export class PrismaModule { }