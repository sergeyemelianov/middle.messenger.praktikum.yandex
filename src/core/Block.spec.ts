import { expect } from 'chai';
import { Block } from './Block';
import Sinon from 'sinon';

describe('Block test', () => {
  let blockClass: typeof Block;

  before(() => {
    class Button extends Block {
      constructor(props: any) {
        super(props);
      }

      render(): string {
        return `<div id="div">{{text}}</div>`;
      }
    }

    blockClass = Button;
  });

  it('Props test', () => {
    const textData = 'Test';
    const buttonComponent = new blockClass({ text: textData });
    const res = buttonComponent.getContent()?.innerHTML;

    expect(res).to.be.eq(textData);
  });

  it('Click event test', () => {
    const handler = Sinon.stub();
    const buttonComponent = new blockClass({ text: 'Test', events: { click: handler } });

    const event = new MouseEvent('click');
    buttonComponent.getContent()?.dispatchEvent(event);

    expect(handler.calledOnce).to.be.true;
  });

  it('Render test', () => {
    const buttonComponent = new blockClass({});

    const spyDCM = Sinon.spy(buttonComponent, '_render');

    buttonComponent.setProps({ text: 'Test' });

    expect(spyDCM.calledOnce).to.be.true;
  });
});
