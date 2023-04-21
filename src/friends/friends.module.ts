import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.schema';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
        ]),
        UsersModule
    ],
    controllers: [FriendsController],
    providers: [FriendsService, UsersService]
})
export class FriendsModule { }
