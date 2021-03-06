import * as mongoose from 'mongoose';
export interface User extends mongoose.Document {
  username     : string;
  password     : number;
  email        : string;
  phone        : string;
  firstName    : string;
  lastName     : string;
  birthday     : Date;
  twoFactorAuthenticationCode: string;
  isTwoFactorAuthenticationEnabled: boolean;
}