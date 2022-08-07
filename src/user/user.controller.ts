import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  // @UseGuards(AuthGuard)
  getAllUsers() {
    return this.userService.getAll();
  }

  @Get('/:id')
  // @Get('/:userId/posts/:postId')
  @ApiQuery({ name: 'id', type: 'string'})
  // @ApiQuery({ name: 'userId/', type: 'string'})
  // @ApiQuery({ name: 'postId/', type: 'string'})
  @UseGuards(AuthGuard)
  getOneUser(@Param('id') id: string) {
    // getOneUser(@Param() param: any) {
    //   const { id, startDate, endDate } = param;
    return this.userService.getOneById(id);
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: "62eefb964a1d26ce499f4ab0",
        name: "AAAAAA",
        age: 21,
        email: "andrii@gmail.com",
        password: "$2a$08$y9nTrB5V1e37FUfivdenz.7kF3eQCQEscjp.QvEkLYUC1wKSWgCk6",
        status: false,
        createdAt: "2022-08-06T23:39:02.000Z",
        updatedAt: "2022-08-06T23:39:02.000Z"
      }
    }
  })
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    this.userService.deleteUser(id);
  }
}
