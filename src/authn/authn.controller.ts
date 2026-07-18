import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import {type User} from '../generated/prisma/client.js'
import { AuthnService } from './authn.service.js';
import { LoginDTO } from './dto/login.dto.js';
import { Public } from '../common/isPublic.decorator.js';
import { JwtRefreshGuard } from '../strategy/refresh.guard.js';
import { type Request } from 'express';
import { SignupDTO } from './dto/signup.dto.js';
@Controller('authn')
@Public()
export class AuthnController {
    constructor(private userService: UserService,
        private authService: AuthnService,
    ){}

@Post("signup")
signup(
@Body() dto: SignupDTO
){
return this.authService.signup(dto);

}
@Post('login')
login(@Body()dto: LoginDTO,
){
return this.authService.login(dto)
}
@UseGuards(JwtRefreshGuard)
@Post('refresh')
getRefreshToken(@Req() req: Request ){
 
    const user = req.user as User;
    if(!user){
        throw new UnauthorizedException();
    }
    return this.authService.refresh(user)

}
}
