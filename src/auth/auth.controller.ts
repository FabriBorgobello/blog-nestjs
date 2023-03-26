import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.appService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: SignInDto) {
    return this.appService.signin(dto);
  }
}
