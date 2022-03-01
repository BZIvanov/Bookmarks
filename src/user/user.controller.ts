import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @HttpCode(HttpStatus.OK)
  // GET /users/me
  @Get('me')
  // we can pass data if we need to, to our GetUser deorator like this 'getMe(@GetUser('email') email: string)'
  // the type User comes from our prisma schema
  getMe(@GetUser() user: User) {
    return user;
  }
}
