import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersSchema }  from './../schemas/user';
import { logger }  from './../errors/index';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UsersSchema }])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule implements NestModule {
 configure(consumer: MiddlewareConsumer) {
 consumer
  .apply(logger)
  .forRoutes(UsersController);
 }
}

