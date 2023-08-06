import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto, SigninDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  // usually we will have the same named functions in the service and the controller. In the service is where we handle the business logic
  async signup(dto: SignupDto) {
    const hashedPassword = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // check for duplicate field error, for example for email which is already used
        if (error.code === 'P2002') {
          throw new ForbiddenException('Invalid credentials');
        }
      }

      throw error;
    }
  }

  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const isPasswordCorrect = await argon.verify(user.password, dto.password);
    if (!isPasswordCorrect) {
      throw new ForbiddenException('Invalid credentials');
    }

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<{ token: string }> {
    const token = await this.jwt.signAsync(
      { sub: userId, email },
      { expiresIn: '30m', secret: this.config.get('JWT_SECRET') },
    );

    return { token };
  }
}
