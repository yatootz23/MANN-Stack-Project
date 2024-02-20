/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { User, UserSchema } from "./schemas/User.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersService } from './users.service';


@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [],
    providers: [UsersService],
    exports:[MongooseModule]
  })
  export class UsersModule {}
  