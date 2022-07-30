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

  deleteUser(id: string) {
    const user = this.users.find((user) => user.id == id);
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
  }

  updateUser(id: string, data: UpdateUserDto) {
    const user = this.users.find((user) => user.id == id);
    const index = this.users.indexOf(user);
    const updatedUser = {...data, id: user.id };
    this.users.splice(index, 1, updatedUser);
    return updatedUser;
  }
}
