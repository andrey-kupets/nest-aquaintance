import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from 'src/core/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UnknownElementException } from '@nestjs/core/errors/exceptions/unknown-element.exception';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {
  }

  async getAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async getOneById(id: string): Promise<User> {
    const userById = await this.prismaService.user.findUnique({
      where: { id }
    });

    if (!userById) {
      throw new HttpException( 'there is no such user in DB', 400);
    }

    return userById;
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.prismaService.user.findFirst({
      where: { email }
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data
    });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: {
        name: data.name,
        age: data.age,
        status: data.status
      }
    });
  }

  async deleteUser(id: string): Promise<User> {
    return this.prismaService.user.delete({
      where: { id }
    });

  }
}
