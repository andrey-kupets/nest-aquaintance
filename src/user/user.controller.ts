import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAll();
  }

  @Get('/:id')
  getOneUser(@Param('id') id: string) {
    // getOneUser(@Param() param: any) {
    //   const { id, startDate, endDate } = param;
    return this.userService.getOneById(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    this.userService.deleteUser(id);
  }
}
