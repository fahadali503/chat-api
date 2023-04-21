import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FriendsService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private userService: UsersService
    ) { }

    async addFriend(userId: string, friendId: string) {
        const user = await this.userModel.findById(userId);
        const friend = await this.userModel.findById(friendId);
        user.friends.push(friend.id);
        friend.friends.push(user.id);
        await user.save();
        await friend.save();
        return {
            message: `${friend.email} has been added to your profile`,
            friendId
        }
    }

    async allFriends(userId: string) {
        const user = (await this.userService.getUserById(userId));
        return (await user.populate("friends")).friends;
    }

    async removeFriend(userId: string, friendId: string) {
        const user = await this.userModel.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true });
        const friend = await this.userModel.findByIdAndUpdate(friendId, { $pull: { friends: userId } }, { new: true });
        return { message: `${friend.email} has been removed from your profile`, friendId }
    }

    async listOfNonFriends(userId: string) {
        const users = await this.userModel.find({ _id: { $ne: userId } });
        const friends = await this.userModel.findById(userId);
        return users.filter(user => !friends.friends.includes(user._id))
    }
}
