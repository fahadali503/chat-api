import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class AuthDto {
    @IsEmail()
    email: string;

    @MinLength(5)
    @IsNotEmpty()
    password: string;
}