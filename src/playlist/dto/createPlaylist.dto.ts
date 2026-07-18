import {IsString, IsOptional,IsArray, IsNumber} from 'class-validator';

export class createPlaylistDTO {
    @IsString()
    readonly name!: string;
    @IsString()
    @IsOptional()
    readonly userId?: number;

    @IsArray()
    @IsNumber({},{each: true})
    @IsOptional()
    readonly songs?: number[];
} 