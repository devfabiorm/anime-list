import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { CaslActions } from 'src/casl/casl-actions.decorator';
import { CaslActionsGuard } from 'src/casl/casl-actions.guard';
import { CheckPolicies } from 'src/casl/check-policies.decorator';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { Action } from 'src/enums/action.enum';
import { Article } from './article';
import { ArticlesService } from './articles.service';
import { Person } from './person';
import { ReadArticlePolicyHandler } from './read-article.policy.handler';

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

  @Get()
  @UseGuards(PoliciesGuard)
  @UseGuards(JwtAuthGuard)
  //@CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Article))
  @CheckPolicies(new ReadArticlePolicyHandler())
  public findAll(): Article[] {
    return this.articlesService.get();
  }
}
