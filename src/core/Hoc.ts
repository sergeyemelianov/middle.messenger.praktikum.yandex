import store, {State} from './Store';
import { Block, Props } from './Block';

export function connect(Component: typeof Block, selector?: (state: State) => void) {
  return class connect extends Component {
    constructor(props: Props) {
      super(props);

      store.subscribe(() => {
        console.log('We are in store subscription', { ...store.getState() }, this.props);
        this.setProps(selector ? selector(store.getState()) : {});
      });

      console.log('THIS IN HOC', this);
    }
  };
}
