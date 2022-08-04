import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('/login')
  login(@Body() loginUser: LoginUserDto) {
    return this.authService.login(loginUser);
  }

  @Post('/register')
  register(@Body() registerUser: RegisterUserDto) {
    return this.authService.register(registerUser);
  }
}
