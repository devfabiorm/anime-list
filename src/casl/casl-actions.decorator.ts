import { SetMetadata } from '@nestjs/common';
import { Action } from 'src/enums/action.enum';

export const ACTIONS = 'actions';
export const CaslActions = (...actions: Action[]) =>
  SetMetadata(ACTIONS, actions);
