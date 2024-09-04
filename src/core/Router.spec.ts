
import { expect } from 'chai';
import sinon from 'sinon';
import { Router } from './Router';
import { Block } from './Block';

describe('Router tests', () => {
  const router = new Router('app');
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

  it('History back', () => {
    window.history.pushState({}, '', '/A');
    window.history.pushState({}, '', '/B');

    router.back();

    window.onpopstate = () => {
      expect(window.location.pathname).to.be.eq('/A');
    };
  });

  it('history forward', () => {
    window.history.pushState({}, '', '/A');
    window.history.pushState({}, '', '/B');

    router.back();
    router.forward();

    window.onpopstate = () => {
      expect(window.location.pathname).to.be.eq('/B');
    };
  });

  it('Router go test', () => {
    const button = new blockClass({ text: 'test' });
    const spy = sinon.spy(router, 'go');
    window.addEventListener('DOMContentLoaded', async () => {
      router.use('/A', button).start();
    });

    router.go('/A');

    expect(spy.calledOnce).to.be.true;
  });
});
