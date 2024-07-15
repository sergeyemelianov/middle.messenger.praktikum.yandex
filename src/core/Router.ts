import { Block, Props } from './Block';

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

function render(query: string, block: Block | null) {
  if (!block) {
    return;
  }
  const root = document.getElementById(query);
  root?.append(block.getContent());
  return root;
}

export class Route {
  private _block: Block<Props> | null;
  private _pathname: string;
  private _blockClass: any;
  private _props: Props;
  constructor(pathname: string, view: Block<Props>, props: Props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}

export class Router {
  history = window.history;
  routes: Route[] = [];
  private _currentRoute: Route | null = null;
  private readonly _rootQuery: string = '';
  private static __instance: Router;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, block: any, props: Props = {}) {
    const route = new Route(pathname, block, {
      ...props,
      rootQuery: this._rootQuery,
    });

    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent): void => {
      if (!event) {
        return;
      }
      this._onRoute((event.currentTarget as Window).location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
