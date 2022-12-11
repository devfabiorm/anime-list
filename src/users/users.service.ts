import { Injectable } from '@nestjs/common';
import { Permission } from 'src/enums/permission.enum';
import { Role } from 'src/enums/role.enum';
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
      permissions: [Permission.EDIT_USER],
    },
  ];

  public async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  public create(user: any): void {
    this.users.push(user);
  }

  public updatePassword(userId: number, password: string): User {
    const user = this.users.find((user: User) => user.userId === userId);
    user.password = password;
    return user;
  }
}
