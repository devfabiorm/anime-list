import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/role.enum';
import { User } from './user';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      roles: [Role.Admin],
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      roles: [Role.User],
    },
  ];

  public async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  public create(user: any): void {
    this.users.push(user);
  }
}
