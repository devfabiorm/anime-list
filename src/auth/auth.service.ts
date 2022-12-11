import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  public async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.userId,
      roles: user.roles,
      permissions: user.permissions,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
