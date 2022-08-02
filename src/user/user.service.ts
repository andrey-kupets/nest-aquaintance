import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from 'src/core/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {
  }

  async getAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async getOneById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id }
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
