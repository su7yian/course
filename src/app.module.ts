import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware.js';
import { SongsModule } from './songs/songs.module.js';
import { DevConfigService } from './common/providers/providers.devConfig.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { PlaylistModule } from './playlist/playlist.module.js';
import { UserModule } from './user/user.module.js';
import { AuthnModule } from './authn/authn.module.js';
import { ArtistModule } from './artist/artist.module.js';
import { JwtAuthGuard } from './strategy/jwt.guard.js';
import { APP_GUARD } from '@nestjs/core';

// unlike class const objects cant have injectable decorator but reciving class must have...
const devConfig ={port: 3000 }
const proConfig =
{port: 400}

@Module({
  imports: [ SongsModule, PrismaModule,     ConfigModule.forRoot({
      isGlobal: true,
    }), PlaylistModule, UserModule, AuthnModule, ArtistModule,
],
  providers: [AppService,
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.Node_ENV === 'development' ? devConfig : proConfig;
      },
    },
    {
      provide: DevConfigService,
      useClass: DevConfigService
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // will used our guard at every endpoint
    },
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
   // consumer.apply(LoggerMiddleware).forRoutes('hi');
    consumer.apply(LoggerMiddleware).forRoutes({path: 'songs', method: RequestMethod.POST});

  }
}
