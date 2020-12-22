import { Controller,Post,Body,Get,Param,Patch,Delete,HttpStatus,HttpException, UseGuards, Req, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { utils } from './../utils/function';
import * as jwt from 'jsonwebtoken';
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

    @Post('/register')  async create(
        @Body('email') email: string,
        @Body('password') password: string,
    )  {
      try { 
        let hash  = await utils.hashPassword(password);
        const user = await this.usersService.create(
            email,
            hash.toString(),
        );
        user.password = undefined;
        let token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          data: user
        }, 'secret');
        return {
            statusCode: HttpStatus.OK,
            message: 'User added successfully',
            user,
            token
        };
      }catch(e){
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          message: e.message,
        }, HttpStatus.FORBIDDEN);
      }
    }

    @Post('/login')  async login(
        @Body('email') email: string,
        @Body('password') password: string,
    )  {
      try { 
        let hash  = await utils.hashPassword(password);
        const user = await this.usersService.login(
            email,
            password,
        );
        user.password = undefined;
        let token = jwt.sign({
          data: user
        }, 'secret');
        return {
            statusCode: HttpStatus.OK,
            message: 'User login successfully',
            user,
            token
        };
      }catch(e){
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          message: e.message,
        }, HttpStatus.FORBIDDEN);
      }
    }

    @Get('/facebook-info')  async getInfoFacebook(
        @Query('email') email: string,
    )  {
      try { 
        const user = await this.usersService.findOne(
            email,
        );
        user.password = undefined;
        let token = jwt.sign({
          data: user
        }, 'secret');
        return {
            statusCode: HttpStatus.OK,
            message: 'User login successfully',
            user,
            token
        };
      }catch(e){
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          message: e.message,
        }, HttpStatus.FORBIDDEN);
      }
    }

    @Get("/facebook")
    @UseGuards(AuthGuard("facebook"))
    async facebookLogin(): Promise<any> {
      return HttpStatus.OK;
    }

    @Get("/facebook/redirect")
    @UseGuards(AuthGuard("facebook"))
    async facebookLoginRedirect(@Req() req: Request): Promise<any> {
      return {
        statusCode: HttpStatus.OK,
        data: req['user'],
      };
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
      return HttpStatus.OK;
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
      return {
        statusCode: HttpStatus.OK,
        data: req['user'],
      };
    }
  
}
