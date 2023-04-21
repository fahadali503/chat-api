import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';
import { FriendsModule } from './friends/friends.module';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/chat"),
    UsersModule,
    ChatModule,
    FriendsModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
