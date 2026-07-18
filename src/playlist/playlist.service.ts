import { Injectable } from '@nestjs/common';
import { createPlaylistDTO } from './dto/createPlaylist.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PlaylistService {
    constructor(private prisma: PrismaService){}
create(dto: createPlaylistDTO ){
    return this.prisma.playlist.create({
        data: {...dto,
         userId: dto.userId? dto.userId : undefined,
         songs:{  connect: dto.songs?.map((id: number) => ({ id:id, }))
    }
    },
    include: { songs:true}
    })
}
}
