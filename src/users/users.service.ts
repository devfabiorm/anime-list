import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './user';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  public async findOne(username: string): Promise<User> {
    return await this.userModel
      .findOne<User>({
        username,
      })
      .exec();
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const encryptedData = await this.authService.encrypt(
      createUserDto.password,
    );

    const createdUser = new this.userModel({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      username: createUserDto.username,
      email: createUserDto.email,
      password: encryptedData.data,
      iv: encryptedData.pattern,
      roles: createUserDto.roles,
      permissions: createUserDto.permissions,
    });

    return createdUser.save();
  }

  public async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  public async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<User> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      return null;
    }

    const encryptedData = await this.authService.encrypt(oldPassword, user.iv);

    const encryptedDataOfNewPassword = await this.authService.encrypt(
      newPassword,
    );

    const updatedUser = await this.userModel.findOneAndUpdate(
      {
        _id: userId,
        password: encryptedData.data,
      },
      {
        password: encryptedDataOfNewPassword.data,
        iv: encryptedDataOfNewPassword.pattern,
      },
    );

    return updatedUser;
  }
}
