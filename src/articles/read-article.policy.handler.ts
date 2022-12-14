import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { IPolicyHandler } from 'src/casl/policy-handler.interface';
import { Action } from 'src/enums/action.enum';
import { Article } from './article';

export class ReadArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Read, Article);
  }
}
