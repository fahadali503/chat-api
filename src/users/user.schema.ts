// user.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

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
}

export const UserSchema = SchemaFactory.createForClass(User);