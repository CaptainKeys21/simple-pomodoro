import { IStateArgs } from '../types/states';

export function backGroundController(state: IStateArgs): void {
  const body = document.getElementsByClassName('body')[0] as HTMLBodyElement;
  body.id = state;
}
