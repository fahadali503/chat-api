import { Controller, Body, Post, } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {


    constructor(
        private usersService: UsersService
    ) { }

    @Post("signup")
    async signupUser(@Body() authDto: AuthDto) {
        return await this.usersService.createUser(authDto)
    }
}
