import './button-component.scss';
import Block, { Props } from '../../core/Block';

type ButtonProps = Props & {
  type?: string;
  selector?: string;
  page?: string;
  label?: string;
  iconName?: string;
  iconSize?: string;
};

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super({ ...props });
  }

  render(): string {
    return `
        <button class="button {{#if type}}button__{{ type }} {{/if}} {{#if selector}}button__{{ selector }} {{/if}}
        " {{#if page}}page="{{ page }}"{{/if}}>
        {{ label }}

        {{#if iconName}}
        <span class="button__icon {{#if iconSize}} button__icon_{{iconSize}} {{/if}} ">
            <img src="../../assets/icons/{{iconName}}.svg" alt="{{iconName}}"/>
        </span>
        {{/if}}
        </button>
    `;
  }
}
