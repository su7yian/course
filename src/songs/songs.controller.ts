import { 
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param, 
    ParseIntPipe, 
    Patch, 
    Post,
    Body, 
    Inject,
    UseGuards
} from '@nestjs/common';
import { SongsService } from './songs.service.js';
import {CreateSongsDTO} from './dto/createSongs.dto.js';
import {Song} from '../generated/prisma/client.js'
import { UpdateSongsDTO } from './dto/updateSongs.dto.js';
import { JwtArtistGuard } from '../strategy/jwt-artist.guard.js';
//the class acts as typescript type of its isntance too but for mere object
//  we need to tell in advance its type too
// import {type Connection} from '../common/constants/constants.js';

@Controller('songs')
export class SongsController {
    constructor(private songsService: SongsService,
   //     @Inject('CONNECTION') private connection: Connection
    ){
     // whatever is here is printed one time when the controllers singleton object is craeted 
     // during application start teh constructor is called.
      //  console.log(this.connection.CONNECTION_STRING);
    }
@Get()
findAll(){
    return this.songsService.findAll();
}

@Get(':index')
findAllbyIndex(@Param('index', new ParseIntPipe()) index: number ){
 try{ 
    return this.songsService.findAll(index);
} catch(e){
        console.log(e)
    // cause e preseerves and gives origonal internal error to terminal logs while client is shown generic error 
    throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR,{cause: e});
}

}

@Get(':id') // by default type of id is string like in terminal every input is string
findOne(
    // id data type is not parseable to int throw this exception and if parseable then cast to id param of type number.
    @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}),) id: number
){
    return this.songsService.findOne(id);
}
@UseGuards(JwtArtistGuard)
@Post()
Create(@Body() dto: CreateSongsDTO): Promise<Song>{
        return this.songsService.create(dto);
    }
@Patch(':id')
Update( @Body() dto: UpdateSongsDTO, 
    @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}),) id: number

){
        return this.songsService.update(id,dto);

}

@Delete(':id')
delete(
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}),) id: number
){
    return this.songsService.delete(id);
}

}
