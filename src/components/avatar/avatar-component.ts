import './avatar-component.scss';
import { Block, Props } from '../../core';

import AvatarTemplate from './avatar-component.hbs?raw';

type AvatarProps = Props & {
  name?: string;
  avatar?: string;
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
