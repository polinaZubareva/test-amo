import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class clientDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('RU')
  phone: string;
}
