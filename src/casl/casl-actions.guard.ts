import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Action } from 'src/enums/action.enum';
import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';
import { ACTIONS } from './casl-actions.decorator';

@Injectable()
export class CaslActionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const action = this.reflector.getAllAndOverride<Action[]>(ACTIONS, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!action) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const ability = this.caslAbilityFactory.createForUser(user);

    return ability.can(Action[`${action}`], user);
  }
}
