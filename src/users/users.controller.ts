import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from './user';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  public async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/profile')
  public(@Request() req) {
    return req.user;
  }

  //the order of UseGuards really matters
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('users')
  @Roles(Role.Admin)
  public create(@Body() user: User) {
    this.usersService.create(user);
  }
}
