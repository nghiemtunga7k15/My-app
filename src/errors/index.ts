import { Request, Response, NextFunction } from 'express';
import { HttpStatus, HttpException, Req, Res, Next } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export function logger(req: Request, res: Response, next: NextFunction) {
	let token =req.headers.authorization.split('Token ')[1];
	jwt.verify(token,'s0me-secr3t-goes-here', function(err, decoded) {
    	if (err)  throw new HttpException({
              status: HttpStatus.NOT_FOUND,
              message: err.message,
            }, HttpStatus.FORBIDDEN);
        req['user']=decoded.data;
    	next();	
  	});
};