import { Injectable, NotFoundException , HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './../interfaces/IUser';
import * as bcrypt from'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(email: string, password: string) {
    const newBook = new this.userModel({
      email,
      password,
    });
    const result = await newBook.save();
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
  async findOne(email: string) {
    const doc = await this.userModel.findOne({email}).exec();
    if (!doc) {
      const newBook = new this.userModel({
        email,
        password: 'null',
      });
      const result = await newBook.save();
      return result;
    }
    return doc;
  }
}
