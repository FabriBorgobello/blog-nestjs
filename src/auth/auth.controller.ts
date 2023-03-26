import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Post('signin')
  signin() {
    return this.appService.signin();
  }
  @Post('signup')
  signup() {
    return this.appService.signup();
  }
}
