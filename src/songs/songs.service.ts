import { Injectable } from '@nestjs/common';
import { CreateSongsDTO } from './dto/createSongs.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateSongsDTO } from './dto/updateSongs.dto.js';

@Injectable()
export class SongsService {
    constructor(private prisma: PrismaService){}
 
     create(dto: CreateSongsDTO){
         return this.prisma.song.create({
            data: {
            ...dto,
           creatorId: dto.creatorId? dto.creatorId : undefined,
    
           artists: dto.artists? {
             connect: dto.artists.map(id => ({ id, }))
    }: undefined

        },
         })
    }
     async findAll(index?: number) {
        const myQuery: any = {
        take: 2,
    };
            if(index){
                myQuery.cursor = {id: index};
                myQuery.skip = 1;
            }
            return this.prisma.song.findMany(myQuery);
        }

    findOne(id: number){
        return this.prisma.song.findUnique({
            where:{ id: id,},
        })
    }
    update(id: number, dto: UpdateSongsDTO){
        return this.prisma.song.update({
            where: {id,},
            data: {...dto,
            artists: dto.artists? {
             connect: dto.artists.map(id => ({ id, }))
    }: undefined },
 })
        }
    delete(id: number){
        return this.prisma.song.delete({
            where:{id,}
        })
    }
}
 