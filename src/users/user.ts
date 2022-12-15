import { Permission } from 'src/enums/permission.enum';
import { Role } from 'src/enums/role.enum';

export class User {
  userId: number;
  username: string;
  password: string | Buffer;
  roles: Role[];
  permissions?: Permission[];
}
