import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
export const DatabaseModule = MongooseModule.forRoot('mongodb://localhost/nest', {
      useNewUrlParser: true,
	  useCreateIndex: true,
	  autoIndex: true,
	  keepAlive: true,
	  poolSize: 10,
	  bufferMaxEntries: 0,
	  connectTimeoutMS: 10000,
	  socketTimeoutMS: 45000,
	  useFindAndModify: false,
	  useUnifiedTopology: true
})