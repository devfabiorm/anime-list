import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CaslModule } from './casl/casl.module';
import { ArticlesModule } from './articles/articles.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:123456@localhost:7017/admin'),
    AuthModule,
    UsersModule,
    CaslModule,
    ArticlesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
