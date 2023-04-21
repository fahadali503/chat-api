import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { HydratedDocument } from "mongoose";
import { User } from "src/users/user.schema";

export type ChatDocument = HydratedDocument<Chat>;

@Schema({ timestamps: true })
export class Chat {
    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "User" })
    participants: User[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);