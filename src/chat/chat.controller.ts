import { Controller, Post, Get, Body, UseInterceptors, UploadedFiles, UseGuards, Request, Param, Query } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ChatService } from './chat.service';
import { MessageService } from './message.service';
import { MessageDTO } from './dtos/text-message.dto';
import { customFileName, imageFileFilter } from 'src/utils/file.utils';
import { diskStorage } from 'multer';
import { AuthGuard } from 'src/users/auth.guard';
import { UserDecorator } from 'src/users/users.decorator';
import { JwtPayload } from 'src/users/constants';

@UseGuards(AuthGuard)
@Controller('chat')
export class ChatController {
    constructor(
        private chatService: ChatService,
        private messageService: MessageService,
    ) { }

    @Post("create")
    async createChat(@Body() obj: { friendId: string }, @UserDecorator() user: JwtPayload) {
        const response = await this.chatService.createChat(user.id, obj.friendId);
        return response;
    }

    @Get("all")
    getUserChats(@UserDecorator() user: JwtPayload) {
        return this.chatService.findChatsByParticipant(user.id);
    }

    @Get(":chatId/messages")
    getMessages(@Param("chatId") chatId: string, @Query('page') page: string) {
        console.log("Page", page)
        return this.messageService.getMessages(chatId, page);
    }

    @Post("text")
    async createTextMessage(@Body() obj: MessageDTO, @UserDecorator() sender: JwtPayload) {
        console.log("Got Message", sender.id)
        return await this.messageService.createTextMessage(obj.chatId, sender.id, obj.content)
    }


    @Post("images")
    @UseInterceptors(FilesInterceptor('files', 5, {
        fileFilter: imageFileFilter,
        storage: diskStorage({
            filename: customFileName,
            destination: "./uploads/images"
        })
    }))
    createImagesMessage(@UploadedFiles() files: Array<Express.Multer.File>) {
        return this.messageService.saveimages(files);
    }

    @Post("recording")
    createRecordingMessage() { }


}
