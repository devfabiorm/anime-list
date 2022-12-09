import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class UsersController {
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  public async login(@Request() req) {
    return req.user;
  }
}
