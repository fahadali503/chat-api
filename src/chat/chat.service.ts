import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './chat.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat.name) private chatModel: Model<Chat>
    ) { }

    async createChat(user1: string, user2: string) {
        const chat = await this.findChatByParticipants(user1, user2);
        if (chat) {
            return chat;
        }
        const newChat = new this.chatModel({ participants: [user1, user2] });
        await newChat.save();
        return newChat
    }

    async findChatByParticipants(participant1: string, participant2: string) {
        return await this.chatModel.findOne({ participants: { $all: [participant1, participant2] } })
    }

    async findChatById(id: string) {
        const chat = await this.chatModel.findById(id);
        return chat;
    }

    async findChatsByParticipant(participantId: string) {
        const chats = await this.chatModel.find({ participants: participantId }).populate('participants');
        return chats;
    }
}
