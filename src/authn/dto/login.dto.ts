import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    example: 'john@example.com',
    description: 'The user email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;
  @ApiProperty({
    example: 'johnrh73r#4',
    description: 'The user secret password',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
