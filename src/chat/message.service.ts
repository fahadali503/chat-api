import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ContentType, Message, MessageType } from './message.schema';
import { Model } from 'mongoose';
import { MessageDTO } from './dtos/text-message.dto';

@Injectable()
export class MessageService {
    private static PAGE_SIZE = 10;
    constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>
    ) { }

    async getMessages(chatId: string, page: string) {
        let pageNumber = parseInt(page);
        const messages = await this.messageModel.find({ chatId })
            .sort({ createdAt: -1 })
            .skip((pageNumber - 1) * MessageService.PAGE_SIZE)
            .limit(MessageService.PAGE_SIZE);
        return messages;
    }

    async createTextMessage(chatId: string, senderId: string, content: string,) {
        const message = new this.messageModel({ chatId, sender: senderId, content, messageType: "text" })
        await message.save();
        return message;
    }

    async saveimages(files: Array<Express.Multer.File>) {
        const paths = this.getPathsFromFiles(files) as string[];
        const message = new this.messageModel({
            chatId: "643f2d1711d9d4a77d13689c", content: paths, isSeen: false,
            sender: "64239adb1ffe2e1d22b47e92",
            messageType: "image"
        });
        await message.save();
        return message;
    }

    private getPathsFromFiles(media: Express.Multer.File | Array<Express.Multer.File>) {
        if (Array.isArray(media)) {
            const paths: string[] = [];
            media.forEach(file => {
                paths.push(file.path);
            });
            return paths as string[];
        } else {
            const singlePath = media.path;
            return singlePath;
        }
    }

}
