import { Controller, Body, Post, Get, } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

@Controller('users')
export class UsersController {


    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) { }

    @Post("signup")
    async signupUser(@Body() authDto: AuthDto) {
        return await this.usersService.createUser(authDto)
    }

    @Post("signin")
    async signinUser(@Body() authDto: AuthDto) {
        return await this.authService.signin(authDto);
    }

}
