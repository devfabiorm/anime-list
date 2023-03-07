import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CaslModule } from 'src/casl/casl.module';
import { ArticlesController } from './articles.controller';

import { ArticlesService } from './articles.service';
import { Person, PersonSchema } from './person';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './article';
import { Image, ImageSchema } from './Image';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Person.name, schema: PersonSchema },
      { name: Article.name, schema: ArticleSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
    MulterModule.register({
      dest: './upload',
    }),
    forwardRef(() => AuthModule),
    CaslModule,
  ],
  providers: [ArticlesService],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
