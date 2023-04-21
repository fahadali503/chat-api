import { IsMongoId, IsString, MaxLength, MinLength, } from 'class-validator';


export class MessageDTO {
    @IsMongoId()
    chatId: string;

    @MaxLength(1000)
    @MinLength(1)
    @IsString()
    content: string;

}
