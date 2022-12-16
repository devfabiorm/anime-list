export class CreateUserDto {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: Array<string>;
  permissions?: Array<string>;
}
