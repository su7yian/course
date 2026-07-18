import { Type } from 'class-transformer';
import { IsArray, IsDate, isDateString, IsDateString, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
export class UpdateSongsDTO{

@IsString()
@IsOptional()
// readonly ensures data is not modified e.g. extra song is pushed to it in service
readonly title?: string;


@IsNumber({},{each:true})
@IsArray()
@IsOptional()
readonly artists?: number[];

@IsDate()
@IsOptional()
@Type(() => Date)
readonly releaseDate?: Date;

@IsOptional()
@IsInt()
readonly duration?: number;

@IsString()
@IsOptional()
readonly lyrics?: string;
}
