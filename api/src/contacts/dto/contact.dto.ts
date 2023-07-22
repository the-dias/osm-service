import { IsEmail, IsString } from 'class-validator';

export class ContactDto {
  @IsEmail()
  email: string;

  @IsString()
  reason: string;

  @IsString()
  message: string;
}
