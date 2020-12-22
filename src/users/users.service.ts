import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './../interfaces/IUser';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(firstName: string, age: number, email: string, password: string, address: string) {
    const doc = new this.userModel({
      firstName,
      age,
      email,
      password,
      address,
    });
    const result = await doc.save();
    return result;
  }
  
  async findOne(email: string) {
    const doc = await this.userModel.findOne({email}).exec();
    if (!doc) {
        throw new Error('User Not Found');
    }
    return doc;
  }

  async update(email ,update: any) {
  	const filter = { email };
  	let doc = await this.userModel.findOneAndUpdate(filter, update);
    if (!doc) {
        throw new Error('User Not Found');
    }
  	return doc;
  }

  async remove(id: string) {
  
  }
}
