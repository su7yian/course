import { Type } from 'class-transformer';
import { IsArray, IsDate, isDateString, IsDateString, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateSongsDTO{
@IsString()
// readonly ensures data is not modified e.g. extra song is pushed to it in service
readonly title!: string;

@IsInt()
@IsOptional()
readonly creatorId?: number;

@IsOptional()
@IsNumber({},{each:true})
@IsArray()
readonly artists?: number[];

@IsOptional() 
@IsDate()
@Type(() => Date)
readonly releaseDate?: Date;

@IsInt()
readonly duration!: number;
@IsString()
@IsOptional()
readonly lyrics?: string; 
}
