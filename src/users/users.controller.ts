import { Controller, Post, Body, Get, Param, Patch, Delete, HttpStatus, HttpException, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { utils } from './../utils/function';
import * as jwt from 'jsonwebtoken';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Patch('/')  async update(
        @Req() req: any,
        @Body('firstName') firstName: string,
        @Body('address') address: string,
        @Body('phone') phone: string,
    ) {
        try { 
        let  { email }  = req.user;
        let update = {
            firstName : firstName,
            address,
            phone : phone
        }
        const user = await this.usersService.update(
            email,
            update
        );
            return {
                statusCode: HttpStatus.OK,
                message: 'User updateed successfully',
            };
        }catch(e){
            throw new HttpException({
              status: HttpStatus.NOT_FOUND,
              message: e.message,
            }, HttpStatus.FORBIDDEN);
        }  
    }

    @Get('/')  async findOne(
        @Req() req: any ,
    ) {
        try { 

            let  { email }  = req.user;
            const user = await this.usersService.findOne(
                email,
            );
            user.password = undefined;
            return {
                statusCode: HttpStatus.OK,
                message: 'User detail successfully',
                user,
            };
        }catch(e){
            throw new HttpException({
              status: HttpStatus.NOT_FOUND,
              message: e.message,
            }, HttpStatus.FORBIDDEN);
        }  
    }
    
}
