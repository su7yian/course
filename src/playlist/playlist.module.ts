import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller.js';
import { PlaylistService } from './playlist.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Module({
  controllers: [PlaylistController],
  providers: [PlaylistService, PrismaService]
})
export class PlaylistModule {}
