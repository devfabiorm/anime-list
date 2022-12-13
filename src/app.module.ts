import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CaslModule } from './casl/casl.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [AuthModule, UsersModule, CaslModule, ArticlesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
