import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CaslActions } from 'src/casl/casl-actions.decorator';
import { CaslActionsGuard } from 'src/casl/casl-actions.guard';
import { Action } from 'src/enums/action.enum';
import { ArticlesService } from './articles.service';
import { Person } from './person';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly authService: AuthService,
  ) {}

  @Post('sign-in')
  public signIn(@Body() person: Person) {
    return this.authService.signIn(person);
  }

  @Delete(':id')
  @UseGuards(CaslActionsGuard)
  @UseGuards(JwtAuthGuard)
  @CaslActions(Action.Delete)
  public removeArticle(@Param('id') articleId: number): void {
    this.articlesService.delete(articleId);
  }
}
