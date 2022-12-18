import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { RequirePermissions } from 'src/auth/require-permissions.decorator';
import { RequirePermissionsGuard } from 'src/auth/require-permissions.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Permission } from 'src/enums/permission.enum';
import { Role } from 'src/enums/role.enum';
import { ChangePasswordInputModel } from './change-password.input-model';
import { CreateUserDto } from './create-user.dto';
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
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/profile')
  public(@Request() req) {
    return req.user;
  }

  //the order of UseGuards does really matter
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('users')
  @Roles(Role.Admin)
  public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUsingHash(createUserDto);
  }

  //the order of UseGuards does really matter
  @UseGuards(RequirePermissionsGuard)
  @UseGuards(JwtAuthGuard)
  @RequirePermissions(Permission.EDIT_USER)
  @Patch('users/changePassword')
  public async changePassword(
    @Body() inputModel: ChangePasswordInputModel,
  ): Promise<User> {
    return await this.usersService.updatePassword(
      inputModel.userId,
      inputModel.oldPassword,
      inputModel.newPassword,
    );
  }
}
