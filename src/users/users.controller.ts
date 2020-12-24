import { Controller, Post, Body, Get, Param, Patch, Delete, HttpStatus, HttpException, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { utils } from './../utils/function';
import * as jwt from 'jsonwebtoken';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';

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

    @Post('/2fa/generate')  async getTwoFactorAuthenticationCode(
        @Res() res,
        @Req() req,
    )  {
      try { 
        let  { email }  = req.user;
        const secretCode = speakeasy.generateSecret({
            name: 'My-Project',
        });
        const user = await this.usersService.update(
            email,
            {twoFactorAuthenticationCode : secretCode.base32}
        );
        function respondWithQRCode(data: string, response: Response) {
            QRCode.toFileStream(response, data);
        }
        respondWithQRCode(secretCode.otpauth_url, res)

      }catch(e){
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          message: e.message,
        }, HttpStatus.FORBIDDEN);
      }
    }

    @Post('/2fa/turn-on')  async turnOnTwoFactorAuthentication(
        @Req() req,
        @Body('2fa') twoFactorAuthenticationCode: string,
    )  {
      try { 
        let  { email }  = req.user;
        const user = await this.usersService.findOne(
            email,
        );
        const isCodeValid = await utils.verifyTwoFactorAuthenticationCode(twoFactorAuthenticationCode, user);
        if (isCodeValid){
            const query = await this.usersService.update(
                email,
                {isTwoFactorAuthenticationEnabled : !user.isTwoFactorAuthenticationEnabled}
            );
            return {
                statusCode: HttpStatus.OK,
                message: 'User detail successfully',
            };
        }else{
            throw new HttpException({
              status: HttpStatus.NOT_FOUND,
              message: 'Two Factor AuthenticationCode Wrong',
            }, HttpStatus.FORBIDDEN);
        }
      }catch(e){
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          message: e.message,
        }, HttpStatus.FORBIDDEN);
      }
    }
    
}
