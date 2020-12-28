import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { UsersModule } from './users/users.module';
import { FacebookStrategy } from './auth/facebook.strategy';
import { GoogleStrategy } from './auth/google.strategy';
import { UserModule } from './auth/user.module';
@Module({
  imports: [DatabaseModule, UsersModule, UserModule],
  controllers: [],
  providers: [FacebookStrategy, GoogleStrategy],
})
export class AppModule {}
