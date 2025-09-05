import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('myprofile')
  userProfile(@Request() req: Request) {
      return this.usersService.findProfile(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  findOne(
    @Param('username') username: string
  ) {
    return this.usersService.findUser(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('follow/:username')
  followUser(
    @Request() req: Request,
    @Param('username') username: string
  ) {
    return this.usersService.addFollow(req, username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('unfollow/:username')
  unfollowUser(
    @Request() req: Request,
    @Param('username') username: string
  ) {
    return this.usersService.removeFollow(req, username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
