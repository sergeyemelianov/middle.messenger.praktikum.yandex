import './avatar-change-component.scss';
import { Block, Props } from '../../core';

import AvatarTemplate from './avatar-change-component.hbs?raw';

type AvatarChangeProps = Props & {
  input?: Block[];
  acceptButton?: Block;
};

export default class AvatarChange extends Block {
  constructor(props: AvatarChangeProps) {
    super({ ...props });
  }

  render(): string {
    return AvatarTemplate;
  }
}
