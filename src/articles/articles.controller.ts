import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
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
import { CreateArticleDto } from './create-article.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './Image';
import { readFileSync } from 'fs';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly authService: AuthService,
    @InjectModel(Image.name)
    private imageModel: Model<ImageDocument>,
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

  @Post()
  public async createArticle(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    return await this.articlesService.create(createArticleDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public uploadFile(@UploadedFile() file: Express.Multer.File) {
    const uploadedImage = new this.imageModel({
      data: Buffer.from(readFileSync(file.path)),
      contentType: 'image/png',
    });

    return uploadedImage.save();
  }

  @Get('download')
  @Header('Content-Disposition', 'attachment; filename="jujutsu.png"')
  public async readFile() {
    const images = await this.imageModel.find().exec();
    return new StreamableFile(images[0].data, { type: images[0].contentType });
  }
}
