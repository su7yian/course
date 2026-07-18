import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller.js';
import { SongsService } from './songs.service.js';
// import { connection } from '../common/constants/constants.js'


const mockSongService = {
findAll(){
  return[{ id:1, title: "mn",
}]; 
},
};   
@Module({
  controllers: [SongsController],
// nest will override first same name provider with second but its not recomended
  providers: 
  [SongsService, 
 // {provide: SongsService, useValue: mockSongService,},
 // you can write anything in provide just pass this name when you wanna inject('CONNECTION') it in controller or service place
 // also we dont add {syntax} for default service class because nest js does it for us its shortcut
 // {provide: 'CONNECTION', useValue: connection, } 
  ],
})
export class SongsModule {}
