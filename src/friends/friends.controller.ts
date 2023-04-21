import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/users/auth.guard';
import { JwtPayload } from 'src/users/constants';
import { UserDecorator } from 'src/users/users.decorator';
import { FriendsService } from './friends.service';

@UseGuards(AuthGuard)
@Controller('friends')
export class FriendsController {
    constructor(
        private friendsService: FriendsService
    ) { }

    @Post("new")
    addNewFriend(@UserDecorator() user: JwtPayload, @Body() payload: { userId: string }) {
        return this.friendsService.addFriend(user.id, payload.userId);
    }

    @Get("all")
    getAllFriends(@UserDecorator() user: JwtPayload) {
        return this.friendsService.allFriends(user.id);
    }


    @Get("non-friends")
    getListOfNonFriends(@UserDecorator() user: JwtPayload) {
        return this.friendsService.listOfNonFriends(user.id);
    }

    @Post("remove")
    removeFriend(@UserDecorator() user: JwtPayload, @Body() payload: { userId: string }) {
        return this.friendsService.removeFriend(user.id, payload.userId);
    }
}

