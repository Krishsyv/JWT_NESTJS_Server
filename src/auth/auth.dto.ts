import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';
import { auth_constants } from './constants';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(auth_constants.password_redex, {
    message: auth_constants.password_msg,
  })
  password: string;
}

export class SigninDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(auth_constants.password_redex, {
    message: auth_constants.password_msg,
  })
  password: string;
}

export class ForgotPasswordDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
