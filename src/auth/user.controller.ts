import { Controller,Post,Body,Get,Param,Patch,Delete,HttpStatus,HttpException, UseGuards, Req, Query, Res, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { utils } from './../utils/function';
import * as jwt from 'jsonwebtoken';
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto) {
    try { 
        let hash  = await utils.hashPassword(createUserDto.password);
        createUserDto.password = hash.toString();
        const user = await this.userService.create(createUserDto);
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

  @Post('/basic')  
  async login(
        @Body('username') username: string,
        @Body('password') password: string,
        @Body('code') twoFactorAuthenticationCode: string,
      )  {
      try { 
        let hash  = await utils.hashPassword(password);
        const user = await this.userService.login(
            username,
            password,
        );
        const isCodeValid = await utils.verifyTwoFactorAuthenticationCode(twoFactorAuthenticationCode, user);
        if (user.isTwoFactorAuthenticationEnabled){
            user.password = undefined;
            let token = jwt.sign({
              data: user
            }, process.env.secret, { expiresIn: parseInt(process.env.tokenLife) });
            let refreshToken = jwt.sign({
              data: user
            }, process.env.refreshTokenSecret, { expiresIn: parseInt(process.env.refreshTokenLife) });
            return {
                statusCode: HttpStatus.OK,
                message: 'User login successfully',
                user,
                token,
                refreshToken
            };
        }else if (isCodeValid){
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
        }else{
          return {
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Two Factor AuthenticationCode Wrong',
          };
        }
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
