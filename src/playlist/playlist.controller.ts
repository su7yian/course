import { Body, Controller, Post } from '@nestjs/common';
import { createPlaylistDTO } from './dto/createPlaylist.dto.js';
import { PlaylistService } from './playlist.service.js';

@Controller('playlist')
export class PlaylistController {
        constructor(private playlistService: PlaylistService,){}
    
@Post()
create(@Body() dto: createPlaylistDTO){
    return this.playlistService.create(dto)
}
}
 