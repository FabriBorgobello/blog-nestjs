import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup({ name, email, password }: SignUpDto) {
    try {
      // Hash the password
      const hash = await bcrypt.hash(password, 10);
      // Create the user
      const user = await this.prisma.user.create({
        data: { name, email, hash },
        select: { id: true, name: true, email: true },
      });
      // Return the user
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already in use.');
        }
      }
      throw error;
    }
  }

  async signin(dto: SignInDto) {
    // Find the user
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: { id: true, name: true, email: true, hash: true },
    });
    // Check if the user exists
    if (!user) {
      throw new ForbiddenException('Invalid credentials.');
    }
    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(dto.password, user.hash);
    if (!isPasswordCorrect) {
      throw new ForbiddenException('Invalid credentials.');
    }
    // Return the user without the property hash
    return { id: user.id, name: user.name, email: user.email };
  }
}
