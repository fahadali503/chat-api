import { Controller, Post, Get, Body, UseInterceptors, UploadedFiles, UseGuards, Request } from '@nestjs/common';
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


    @Post("text")
    async createTextMessage(@Body() obj: MessageDTO, @UserDecorator() sender: JwtPayload) {
        console.log("Got Message", sender.id)
        return await this.messageService.createTextMessage(obj.chatId, sender.id, obj.content)
    }

    @Post("recording")
    createRecordingMessage() { }

    @Get("messages")
    getMessages() {

    }

    @Post("create")
    async createChat(@Body() obj: { p1: string, p2: string }) {
        console.log(obj)
        const response = await this.chatService.createChat(obj.p1, obj.p2)
        return response;
    }
}
