import { Injectable } from '@nestjs/common';
import { Article, ArticleDocument } from './article';
import { Person, PersonDocument } from './person';
import { CreateArticleDto } from './create-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Person.name)
    private personModel: Model<PersonDocument>,
    @InjectModel(Article.name)
    private articleModel: Model<ArticleDocument>,
  ) {}

  public async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const createdAuthor = new this.personModel({
      name: createArticleDto.author,
      isAdmin: false,
    });

    const savedAuthor = await createdAuthor.save();

    const createdArticle = new this.articleModel({
      content: createArticleDto.article,
      author: savedAuthor,
      isPublished: true,
      date: new Date(),
    });

    return createdArticle.save();
  }

  public update(articleId: number): Article {
    throw new Error('Not implemented yet.');
  }

  public delete(articleId: number): void {
    throw new Error('Not implemented yet.');
  }

  public get(): Article[] {
    throw new Error('Not implemented yet.');
  }
}
