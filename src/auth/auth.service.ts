import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signin() {
    return { message: 'Signed in.' };
  }
  signup() {
    return { message: 'Signed up.' };
  }
}
