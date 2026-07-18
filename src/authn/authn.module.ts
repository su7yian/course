import { Module } from '@nestjs/common';
import { AuthnController } from './authn.controller.js';
import { AuthnService } from './authn.service.js';
import { UserModule } from '../user/user.module.js';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../strategy/jwt.strategy.js';
import { ArtistModule } from '../artist/artist.module.js';
import 'dotenv/config'; // <-- MUST BE THE VERY FIRST LINE
import { JwtRefreshStrategy } from '../strategy/jwtRefresh.strategy.js';

@Module({
  controllers: [AuthnController],
  providers: [AuthnService, JwtStrategy, JwtRefreshStrategy],
  imports: [UserModule, PassportModule , ArtistModule , JwtModule],
  exports: [AuthnService]
})
export class AuthnModule {}
     
   
