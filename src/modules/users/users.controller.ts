import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UuidParamDto } from './dto/uuid-param.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: UuidParamDto) {
    return this.usersService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: UuidParamDto,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.update(params.id, updatePasswordDto);
  }

  @Delete(':id')
  remove(@Param() params: UuidParamDto) {
    return this.usersService.remove(params.id);
  }
}
