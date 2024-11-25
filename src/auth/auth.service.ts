import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForgotPasswordDto, SignupDto } from './auth.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signIn(
    email: string, // Change username to email for better clarity
    password: string,
    response: Response,
  ): Promise<String> {
    // Fetch user by email
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // User not found
    }

    // Compare the hashed password
    const isPasswordValid = await this.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials'); // Password mismatch
    }

    // Create JWT payload
    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    // Set the token as an HttpOnly cookie
    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    });

    return 'Login successful';
  }

  async signup(signupDto: SignupDto) {
    const { email, password, first_name, last_name } = signupDto;

    // Check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!!existingUser) {
      throw new BadRequestException('Email already exists');
    }

    // Hash the password
    const hashedPassword = await this.hashPassword(password);

    // Create the user
    const newUser = await this.prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
      },
    });

    // Return user data (omitting sensitive info like password)
    return {
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    return 'work in progress';
  }

  // Helper function to compare passwords
  private async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // Helper function to hash the password
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
