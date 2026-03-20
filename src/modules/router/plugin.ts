import { action, atom } from '@reatom/core';
import {
  NavigationOptions,
  PluginFactory,
  State as StateRouter5,
} from 'router5';

export type State = {
  route?: StateRouter5;
  previousRoute?: StateRouter5;
  transitionRoute?: StateRouter5;
  transitionError?: string;
};

export type NavigationToProps = {
  name: string;
  params?: Record<string, any>;
  opts?: NavigationOptions;
};

type RouterActionProp = {
  toState?: StateRouter5;
  fromState?: StateRouter5;
  err?: string;
};

const initialState: State = {
  route: undefined,
  previousRoute: undefined,
  transitionRoute: undefined,
  transitionError: undefined,
};

const moduleName = 'router';

export const routerAtom = atom<State>(initialState, moduleName);

export const atomNaming = (name: string) => {
  return `${moduleName}.${name}`;
};

export const transitionStartAction = action((payload: RouterActionProp) => {
  const state = routerAtom();
  routerAtom.set({
    ...state,
    transitionRoute: payload.toState,
    transitionError: undefined,
  });
}, atomNaming('transitionStart'));

export const transitionSuccessAction = action((payload: RouterActionProp) => {
  const state = routerAtom();

  routerAtom.set({
    ...state,
    route: payload.toState,
    transitionRoute: undefined,
    transitionError: undefined,
    previousRoute: payload.fromState,
  });
}, atomNaming('transitionSuccess'));

export const transitionErrorAction = action((payload: RouterActionProp) => {
  const state = routerAtom();
  routerAtom.set({
    ...state,
    transitionRoute: payload.toState,
    transitionError: payload.err,
  });
}, atomNaming('transitionError'));

export const navigateToAction = action<NavigationToProps>(
  () => {},
  atomNaming('navigateTo'),
);

export const plugin: PluginFactory = (router) => {
  navigateToAction.subscribe((params) => {
    const payload = params[0]?.params[0];

    if (payload && router) {
      router.navigate(payload.name, payload.params || {}, payload.opts || {});
    }
  });

  return {
    onTransitionStart(toState, fromState) {
      transitionStartAction({ toState, fromState });
    },
    onTransitionSuccess(toState, fromState) {
      transitionSuccessAction({ toState, fromState });
    },
    onTransitionError(toState, fromState, err) {
      transitionErrorAction({ toState, fromState, err });
    },
  };
};
