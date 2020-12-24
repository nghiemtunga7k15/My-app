import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  	firstName       : { type: String, default : "" },
  	email           : { type: String, required: true, unique: true, dropDups: true },
  	password        : { type: String, required: true },
  	address         : { type: String, default : "" },
  	phone           : { type: String, default : "" },
  	twoFactorAuthenticationCode           : { type: String, default : "" },
  	isTwoFactorAuthenticationEnabled      : { type: Boolean, default : false },
});
