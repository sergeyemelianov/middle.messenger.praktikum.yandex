import './avatar-component.scss';
import { Block, Props } from '../../core';

import AvatarTemplate from './avatar-component.hbs?raw';
import { Conversation } from '../chat-list-item/chat-list-item-component';

type AvatarProps = Props & {
  name?: string;
  avatar?: Conversation['avatar'];
  size?: string;
};

export default class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({ ...props });
  }

  render(): string {
    return AvatarTemplate;
  }
}
