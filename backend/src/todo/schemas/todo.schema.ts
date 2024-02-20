/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo{
    @Prop()
    task: string;

    @Prop()
    status: boolean;

    @Prop()
    userid: string;
    
}

export const TodoSchema = SchemaFactory.createForClass(Todo);