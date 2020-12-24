import * as mongoose from 'mongoose';
export interface User extends mongoose.Document {
  name    : string;
  age     : number;
  email   : string;
  password: string;
  twoFactorAuthenticationCode: string;
  isTwoFactorAuthenticationEnabled: boolean;
}