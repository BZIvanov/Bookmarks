import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AUTH_STRATEGY_TYPE } from '../constants';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard(AUTH_STRATEGY_TYPE))
  @Get('me') // GET /users/me
  getMe(@Req() req: Request) {
    return 'current user';
  }
}
