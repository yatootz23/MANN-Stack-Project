/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {

  constructor(@InjectModel(Todo.name) private TodoModel: Model<Todo>) {
    
  }

  async create(createTodoDto: CreateTodoDto, userid: string) :Promise<Todo> {
    const createdTask = new Todo();
    createdTask.task = createTodoDto.task;
    createdTask.status = false;
    createdTask.userid = userid;
    await this.TodoModel.create(createdTask);
    return createdTask;
  }

  async findAll(userid: string, status?: "OPEN" | "DONE") {
    if(status){
      return this.TodoModel.$where((todo) => todo.status === status);
    }
    return this.TodoModel.find();
  }

  async findOne(id: string) {
    const todo = await this.TodoModel.findOne({ _id: id }).exec();
    if(!todo){
      throw new Error("Task not found");
    }
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.TodoModel.findByIdAndUpdate(id, updateTodoDto, {new: true}).exec();
    if(!todo){
      throw new Error("Task not found");
    }
    return todo;
  }

  async updateStatus(id: string) {
    const todo = await this.TodoModel.findOne({ _id: id }).exec();
    if(!todo){
      throw new Error("Task not found");
    }
    todo.status = !todo.status;
    await this.TodoModel.findByIdAndUpdate(id, todo, {new: true}).exec();
    return todo;
  }

  async remove(id: string) {
    const deletedTask = await this.TodoModel.findByIdAndDelete({_id: id}).exec();
    if(!deletedTask){
      throw new Error("Task not found");
    }
    return deletedTask;
  }
}
