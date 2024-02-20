/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {

    @Prop()
    _id?: string;

    @Prop({unique: true})
    username?: string;

    @Prop({unique: true})
    email?: string;
    
    @Prop()
    password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);