import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { User } from './../interfaces/IUser';
import * as bcrypt from'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    const doc = new this.userModel(createUserDto);
    const result = await doc.save();
    return result;
  }
  async login(email: string, hashedPassword: string) {
    try {
      const user = await this.userModel.findOne({email}).exec();
      const match = await bcrypt.compare(hashedPassword, user.password);
      if (match == false) {
        throw new Error('Email or Password Wrong');
      }
      return user;
    } catch (error) {
      throw new Error('Email or Password Wrong');
    }
  }
}
