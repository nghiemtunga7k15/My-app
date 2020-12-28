import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersSchema }  from './../auth/entities/user.entity';
import { logger }  from './../errors/index';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UsersSchema }])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule  {
 // configure(consumer: MiddlewareConsumer) {
 // consumer
 //  .apply(logger)
 //  .forRoutes(UserController);
 // }
}

