import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user';
import { Person } from 'src/articles/person';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { EncryptDto } from 'src/users/encrypt.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === (await this.encrypt(pass, user.iv)).data) {
      return {
        id: user._id,
        username: user.username,
        roles: user.roles,
        permissions: user.permissions,
      };
    }

    return null;
  }

  public async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
      permissions: user.permissions,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  public async signIn(person: Person) {
    const payload = {
      username: person.name,
      sub: person.id,
      isAdmin: person.isAdmin,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async encrypt(
    textToEncrypt: string,
    pattern?: Buffer,
  ): Promise<EncryptDto> {
    const iv = pattern?.length > 0 ? pattern : randomBytes(16);
    const password = 'Password used to generate key';

    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);

    const encrypt = new EncryptDto();

    encrypt.data = encryptedText.toString(`hex`);
    encrypt.pattern = iv;

    return encrypt;
  }

  private async decrypt(encryptedText: string): Promise<Buffer> {
    const encryptedTextBuffer = Buffer.from(encryptedText, 'hex');
    const iv = randomBytes(16);

    const key = (await promisify(scrypt)(encryptedText, 'salt', 32)) as Buffer;

    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    const decryptedText = Buffer.concat([
      decipher.update(encryptedTextBuffer),
      decipher.final(),
    ]);

    return decryptedText;
  }
}
