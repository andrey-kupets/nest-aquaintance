import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private users = [];

  getAll() {
    return this.users;
  }

  getOneById(id: string) {
    // Number(id) -> convert string to number;
    return this.users.find((user) => user.id == id);
  }

  createUser(user: CreateUserDto) {
    this.users.push({
      ...user,
      id: new Date().valueOf(),
    });
    return user;
  }

  // updateUser(data: UpdateUserDto)
  // deleteUser(id: string)
}
