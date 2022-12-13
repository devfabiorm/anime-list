import { Injectable } from '@nestjs/common';
import { Article } from './article';
import { Person } from './person';

@Injectable()
export class ArticlesService {
  public create(author: Person, article: Article): void {
    throw new Error('Not implemented yet.');
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
