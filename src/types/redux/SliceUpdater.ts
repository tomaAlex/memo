import {ReduxProps} from './props';

export type ReduxSliceUpdater<P = any> = (
  reduxProps: ReduxProps,
) => (payload: P) => void;

export type ReduxSliceManager<P = any, T = any> = {
  update: ReduxSliceUpdater<P>;
  adapt: (response: T) => P;
};
