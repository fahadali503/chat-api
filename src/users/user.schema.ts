// user.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as mongoose from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true, toJSON: {
        transform(doc, ret, options) {
            delete ret["password"]
        },
    }
})
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, })
    password: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], default: [], })
    friends: mongoose.Types.ObjectId[]
}

export const UserSchema = SchemaFactory.createForClass(User);