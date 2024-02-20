/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, Request, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
//import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    return this.todoService.create(createTodoDto, req.user.id);
  }

  @Get()
  //@UseGuards(JwtAuthGuard)
  findAll(@Query('status') status: "OPEN" | "DONE") {
    return this.todoService.findAll(status);
  }

  @Get(':id')
  //@UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    try {
      return this.todoService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Patch(':id')
  //@UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    try {
      return this.todoService.update(id, updateTodoDto);
    } catch (error) {
      return new NotFoundException();
    }
  }
  @Post(':id/status')
  //@UseGuards(JwtAuthGuard)
  updateStatus(@Param('id') id: string) {
    try {
      return this.todoService.updateStatus(id);
    } catch (error) {
      return new NotFoundException();
    }
  }

  @Delete(':id')
  //@UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
