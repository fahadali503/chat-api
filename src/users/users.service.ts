import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDto } from './auth.dto';
import { hash } from "bcryptjs";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {

    }


    async createUser(data: AuthDto) {
        try {
            const isUserFound = await this.getUserByEmail(data.email);
            if (isUserFound) {
                return {
                    success: false,
                    message: "User already exists"
                };
            }

            const password = await hash(data.password, 10);
            const newUser = new this.userModel({ ...data, password });
            await newUser.save();
            return {
                success: true,
                message: "User created successfully",
                user: newUser
            }
        } catch (error) {
            const err = error as Error;
            console.log(err.message);
            return {
                success: false,
                message: "Something went wrong while creating the user"
            }
        }
    }

    async getUserByEmail(email: string) {
        return await this.userModel.findOne({ email }).exec()
    }
}
