
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
  

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Method to find a user by their email
  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
