export class CreateUserDto {
  username     : string;
  password     : string;
  email        : string;
  phone        : string;
  firstName    : string;
  lastName     : string;
  birthday     : Date;
  twoFactorAuthenticationCode: string;
  isTwoFactorAuthenticationEnabled: boolean;
}
