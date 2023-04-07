import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthDto } from "./auth.dto";
import { UsersService } from "./users.service";
import { compare } from "bcryptjs";
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {

    }
    async signin({ email, password }: AuthDto) {
        try {
            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                throw new BadRequestException("Invalid email/password.");
            }

            const isPasswordCorrect = await compare(password, user.password);
            if (!isPasswordCorrect) {
                throw new BadRequestException("Invalid email/password.");
            }
            const payload = { id: user._id, email: user.email };
            return {
                success: true,
                message: "Successfully logged in.",
                token: await this.jwtService.signAsync(payload),
                user
            }

        } catch (error) {
            const err = error as Error;
            console.log(err.message);
            throw new BadRequestException(err.message)
        }
    }
}