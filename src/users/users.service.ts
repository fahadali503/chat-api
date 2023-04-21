import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDto } from './auth.dto';
import { hash } from "bcryptjs";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {

    }


    async createUser(data: AuthDto) {
        try {
            const isUserFound = await this.getUserByEmail(data.email);
            if (isUserFound) {
                throw new BadRequestException("User already exists");
            }

            const password = await hash(data.password, 10);
            const newUser = new this.userModel({ ...data, password });
            await newUser.save();
            return {
                success: true,
                message: "User created successfully"
            }
        } catch (error) {
            const err = error as Error;
            console.log(err.message);
            throw new BadRequestException(err.message)
        }
    }

    async getUserByEmail(email: string) {
        return await this.userModel.findOne({ email }).exec()
    }

    async getUserById(userId: string) {
        return await this.userModel.findById(userId).exec();
    }

}
