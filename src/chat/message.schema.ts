import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { HydratedDocument } from "mongoose";

import { User } from "src/users/user.schema";
import { Chat } from "./chat.schema";


export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    sender: User;

    @Prop({ type: String })
    content: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Chat" })
    chatId: Chat

    @Prop()
    isSeen: boolean;
}
export const MessageSchema = SchemaFactory.createForClass(Message);

export type MessageType = "text" | "recording" | "image";

export type ContentType = string | string[];

// @Schema({ timestamps: true })
// export class Message {
//     @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
//     sender: User;

//     @Prop({ enum: ['text', 'recording', 'image'] })
//     messageType: MessageType;

//     @Prop({ type: mongoose.Schema.Types.Mixed })
//     content: ContentType; // text | images path | recording path


//     @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Chat" })
//     chatId: Chat

//     @Prop()
//     isSeen: boolean;
// }

