import { Document } from 'mongoose';
import { Permission } from 'src/enums/permission.enum';
import { Role } from 'src/enums/role.enum';

export class User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  roles: Role[];
  permissions?: Permission[];
  iv: Buffer;
}
