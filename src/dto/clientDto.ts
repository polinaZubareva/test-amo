import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class ClientDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('RU')
  phone: string;
}
