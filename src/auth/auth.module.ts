import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  providers: [AuthService, PassportModule],
  exports: [AuthService, LocalStrategy],
})
export class AuthModule {}
