import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/users.module';
import { FacebookStrategy } from './auth/facebook.strategy';
import { GoogleStrategy } from './auth/google.strategy';
import { UserModule } from './user/user.module';
@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, UserModule],
  controllers: [],
  providers: [FacebookStrategy, GoogleStrategy],
})
export class AppModule {}
