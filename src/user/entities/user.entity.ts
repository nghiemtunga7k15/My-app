import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  	username        : { type: String, required: true },
  	password        : { type: String, required: true },
  	email           : { type: String, required: true, unique: true, dropDups: true },
  	phone           : { type: String, default : "" },
  	firstName       : { type: String, default : "" },
  	lastName        : { type: String, default : "" },
  	birthday        : { type: Date  , default : "" },
  	twoFactorAuthenticationCode           : { type: String, default : "" },
  	isTwoFactorAuthenticationEnabled      : { type: Boolean, default : true },
});
