import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtOptions } from '@constants/jwt-constants';
import { uriMongo } from '@constants/mongo-constants';

@Module({
  imports: [
    JwtModule.register(jwtOptions),
    MongooseModule.forRoot(uriMongo),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
