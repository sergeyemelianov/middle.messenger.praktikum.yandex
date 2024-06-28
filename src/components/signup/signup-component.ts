import './signup-component.scss';
import Block, { Props } from '../../core/Block';
import Input from '../input/input-component';
import Button from '../button/button-component';
import SignupTemplate from './signup-component.hbs?raw';
import { validate, ValidateSourceType } from '../../shared/utils/validation.util';
import { navigate, pagesList } from '../../index';

type SignupProps = Props & {
  type?: string;
};

const inputState = {
  type: 'text',
  showLabel: true,
  showDivider: true,
};

export class Signup extends Block {
  validationIsSuccessful = true;

  constructor(props: SignupProps) {
    super({
      ...props,
      inputList: [
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'Email',
          name: 'email',
          events: {
            blur: (event: Event) => this.eventHandlers('email', event),
          },
        }),
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'Login',
          name: 'login',
          events: {
            blur: (event: Event) => this.eventHandlers('login', event),
          },
        }),
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'Name',
          name: 'first_name',
          events: {
            blur: (event: Event) => this.eventHandlers('first_name', event),
          },
        }),
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'Second name',
          name: 'first_name',
          blur: (event: Event) => this.eventHandlers('second_name', event),
        }),
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'Phone number',
          name: 'phone',
          events: {
            blur: (event: Event) => this.eventHandlers('phone', event),
          },
        }),
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'Password',
          name: 'password',
          events: {
            blur: (event: Event) => this.eventHandlers('password', event),
          },
        }),
        new Input({
          ...inputState,
          selector: 'edit',
          label: 'Repeat password',
          name: 'password',
          events: {
            blur: (event: Event) => this.eventHandlers('password', event),
          },
        }),
      ],
      buttonConfirm: new Button({
        type: 'confirmation',
        page: 'chatboard',
        label: 'Confirm',
        events: {
          click: (event: Event) => {
            this.submitForm(event);
            navigate(pagesList.chatboard);
          },
        },
      }),
      buttonLogin: new Button({
        type: 'link',
        page: 'login',
        label: 'Already have an account?',
        events: {
          click: () => navigate(pagesList.login),
        },
      }),
    });
  }

  eventHandlers(name: ValidateSourceType, e: Event): void {
    if (!e) {
      return;
    }
    this.validationIsSuccessful = validate(name, (e.target as HTMLInputElement).value);
  }

  submitForm(event: Event): void {
    event.preventDefault();
  }

  render(): string {
    return SignupTemplate;
  }
}
