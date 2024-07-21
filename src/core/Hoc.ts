import store from './Store';
import { Block, Props } from './Block';

export function connect(Component: typeof Block) {
  return class connect extends Component {
    constructor(props: Props) {
      super(props);

      store.subscribe(() => {
        console.log('We are in store subscription', { ...store.getState() });
        this.setProps({ ...store.getState() });
      });

      console.log(this);
    }
  };
}
