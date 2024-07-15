import store from './Store';
import { Props } from './Block';

export function connect(Component: new (props: Props) => any) {
  return class extends Component {
    constructor(props: Props) {
      super(props);

      store.subscribe(() => {
        console.log('We are in store subscription');
        this.setProps({ ...store.getState() });
      });

      console.log(this);
    }
  };
}
