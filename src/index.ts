//@ts-nocheck
import Block from './core/Block';
import Button from './components/button';
import Input from './components/input';
import e from 'express';

class ChatItem extends Block {
  constructor({ ...props }) {
    super({
      ...props,
    });
  }

  render() {
    return `
      <div>
        <div>{{ name }}</div>
        <div>{{ message }}</div>
      </div>`;
  }
}

// class Button extends Block {
//   constructor(props) {
//     super({
//       ...props,
//       events: {
//         click: () => console.log('event')
//       },
//       attr: {
//         class: `fake`
//       }
//     })
//   }
//
//   render() {
//     return "<button>{{text}}</button>"
//   }
// }

// class Input extends Block {
//   constructor(props) {
//     super({
//       ...props,
//       events: {
//         change: (e) => props.onChange(e.target.value),
//         blur: (e) => this.validate(),
//       },
//     })
//   }
//
//   render() {
//     return `<input />`
//   }
//
//   validate() {
//     console.log('Here we call validation code on blur');
//   }
// }

class PageWithButton extends Block {
  constructor(props) {
    super({
      ...props, //{buttonText: 'Button'}
      button: new Button({ text: props.buttonText }),
      input: new Input({
        label: 'input',
        onChange: (value) => {
          this.setProps({ buttonText: value });
        },
      }),
    });
  }

  componentDidUpdate(oldProps, newProps) {
    if (oldProps.buttonText !== newProps.buttonText) {
      this.children.button.setProps({ text: newProps.buttonText });
    }
    return true;
  }

  override render() {
    return '<div>{{{ button }}} {{{ input }}}</div>';
  }
}

class PageWithList extends Block {
  constructor(props) {
    super({
      ...props, //{buttonText: 'Button'}
      lists: [
        new ChatItem({ name: 'Samanta Smith', message: 'Алло, на!' }),
        new ChatItem({ name: 'John Dow 1', message: 'What?' }),
        new ChatItem({ name: 'John Dow 2', message: 'What?' }),
        new ChatItem({ name: 'John Dow 3', message: 'What?' }),
        new ChatItem({ name: 'John Dow 4', message: 'What?' }),
        new ChatItem({ name: 'John Dow 5', message: 'What?' }),
        new ChatItem({ name: 'John Dow 6', message: 'What?' }),
        new ChatItem({ name: 'John Dow', message: 'What?' }),
        new ChatItem({ name: 'John Dow', message: 'What?' }),
        new ChatItem({ name: 'John Dow', message: 'What?' }),
        new ChatItem({ name: 'John Dow', message: 'What?' }),
        new ChatItem({ name: 'Samanta Smith', message: 'Алло, на!' }),
        new ChatItem({ name: 'John Dow 1', message: 'What?' }),
        new ChatItem({ name: 'John Dow 2', message: 'What?' }),
        new ChatItem({ name: 'John Dow 3', message: 'What?' }),
        new ChatItem({ name: 'John Dow 4', message: 'What?' }),
        new ChatItem({ name: 'John Dow 5', message: 'What?' }),
        new ChatItem({ name: 'John Dow 6', message: 'What?' }),
        new ChatItem({ name: 'John Dow', message: 'What?' }),
        new ChatItem({ name: 'John Dow', message: 'What?' }),
        new ChatItem({ name: 'John Dow', message: 'What?' }),
        new ChatItem({ name: 'John Dow', message: 'What?' }),
      ],
    });
  }

  override render() {
    return '<div>{{{ lists }}}</div>';
  }
}

const block = new PageWithButton({ buttonText: 'Button' });
// const button = new Button({
//   type:'confirmation',
//   page:'chatboard',
//   label:'Confirm'
// });

const onChange = (e) => {
  console.log('onChange', e);
}
const input = new Input({
  type: 'text',
  selector: 'edit',
  label: 'Username',
  name: 'login',
  showLabel: true,
  showDivider: true,
  minL: '2',
  onChange
});

//const block = new PageWit hList();
const container = document.getElementById('app')!;
container.append(input.getContent()!);


