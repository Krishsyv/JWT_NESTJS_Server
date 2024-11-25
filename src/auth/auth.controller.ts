import {
  Body,
  Controller,
  Get,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { constants } from 'src/constants';
import { ApiBody } from '@nestjs/swagger';
import { ForgotPasswordDto, SigninDto, SignupDto } from './auth.dto';

@constants.Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiBody({ type: SignupDto })
  signup(@Body() SignupDto: SignupDto) {
    return this.authService.signup(SignupDto);
  }

  @Post('login')
  @ApiBody({ type: SigninDto })
  signIn(@Body() signInDto: SigninDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.signIn(
      signInDto.email,
      signInDto.password,
      response,
    );
  }

  @ApiBody({ type: ForgotPasswordDto })
  @Get('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

}
