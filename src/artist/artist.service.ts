import { Injectable } from '@nestjs/common';
import { Artist } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ArtistService {
    constructor(private prisma: PrismaService){}
findArtist(userId: number): Promise< Artist | null>{
    return this.prisma.artist.findFirst({
        where: { userId,}
    })
}
}
