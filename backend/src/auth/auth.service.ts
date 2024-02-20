/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../users/schemas/User.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>,
  private jwtService: JwtService) {}

  public async createUser(createUserDTO: CreateUserDto){
    const existingUser = await this.UserModel.findOne({email: createUserDTO.email}).exec();

    if (existingUser) {
      throw new Error('Email already exists.');
    } else {
      const user = new User;
      user.email = createUserDTO.email;
      user.username = createUserDTO.username;
      const salt = await bcrypt.genSalt();
      user.password = (await bcrypt.hash(createUserDTO.password, salt)).toString();

      await this.UserModel.create(user);
      return user;
    }
  }

  async logIn(loginDto: LoginDto){
    const user = await this.UserModel.findOne({username: loginDto.username});
    if(!user){
      return new NotFoundException();
    }
    if (!bcrypt.compareSync(loginDto.password, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { id: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}