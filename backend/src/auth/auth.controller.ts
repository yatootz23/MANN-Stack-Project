/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards, Request, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
//import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  logIn(@Req() req) {
    return req.user;
    //return this.authService.logIn(loginDto);
  }

  @Post('register')
  register(@Body() createuserDto: CreateUserDto){
    return this.authService.createUser(createuserDto);
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Request() req){
    const test = req.user.id;
    return test;
  }
}