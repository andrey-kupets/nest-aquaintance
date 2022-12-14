import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { User, Auth, Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { PrismaService } from '../core/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private prismaService: PrismaService
  ) {}

  async login(authUser: LoginUserDto) {
    const userAuthorized = await this.validateUser(authUser);
    const { access_token } = await this.generateToken(userAuthorized);

    return { access_token };
  }

  // async login(authUser: LoginUserDto, ): Promise<Auth> {
  //   const userAuthorized = await this.validateUser(authUser);
  //   const { access_token } = await this.generateToken(userAuthorized);
  //
  //   this.prismaService.auth.create({
  //     user_id: userAuthorized.id,
  //     access_token
  //   });
  //
  //   return { user_id: userAuthorized.id, access_token };
  // }

  async register(registerUser: RegisterUserDto) {
    const userByEmailFromDb = await this.userService.getUserByEmail(registerUser.email);
    if (userByEmailFromDb) {
      throw new HttpException('user is already exist', HttpStatus.BAD_REQUEST);
    }

    const hashPass = await bcrypt.hash(registerUser.password, 8);

    return await this.userService.createUser({
      ...registerUser,
      password: hashPass
    });
  }

  private async validateUser(user: LoginUserDto) {
    const userByEmailFromDb = await this.userService.getUserByEmail(user.email);
    const isPassEqual = await bcrypt.compare(user.password, userByEmailFromDb.password);

    if (userByEmailFromDb && isPassEqual) {
      return userByEmailFromDb;
    }

    throw new UnauthorizedException({message: 'wrong email or password'});
  }

  private async generateToken(user: User) {
    const payload = {email: user.email, name: user.name, id: user.id};
    return {
      access_token: this.jwtService.sign(payload, {
        privateKey: 'secret'
      })
    };
  }
}
