import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs';

import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async login(authUser: LoginUserDto) {
    const user = await this.validateUser(authUser);
  }

  private async validateUser(user: LoginUserDto) {
    const userByEmailFromDb = await this.userService.getUserByEmail(user.email);
    const isPassEqual = await bcrypt.compare(user.password, userByEmailFromDb.password);

    if(userByEmailFromDb && isPassEqual) {
      return userByEmailFromDb;
    }

    throw new UnauthorizedException({ message: 'wrong email or password'});
  }

  async register(registerUser: RegisterUserDto) {

  }
}
