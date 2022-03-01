import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  // we just need to specify our service as DI and NestJS will handle under the hood creating the instance and providing it to us
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED) // this is the default status code for Post anyway
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
