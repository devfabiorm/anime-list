import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CaslModule } from 'src/casl/casl.module';
import { ArticlesController } from './articles.controller';

import { ArticlesService } from './articles.service';

@Module({
  imports: [forwardRef(() => AuthModule), CaslModule],
  providers: [ArticlesService],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
