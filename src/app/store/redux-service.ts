import {
  ConfigureStoreOptions,
  CreateSliceOptions,
  Slice,
  Store,
  UnknownAction,
  configureStore,
  createSlice,
} from '@reduxjs/toolkit';

export class ReduxService {
  private static instance: ReduxService;
  private statesAndActions: Record<
    string,
    {
      subscribeCallBacks: any[];
      actions: any;
      selectors: any;
      slice: Slice | null;
    }
  > = {};
  private allSlices: Slice[] = [];

  // @ts-ignore
  private store: Store<any>;

  private constructor() {}

  configSlicesOptions(options: CreateSliceOptions[]): Slice[] {
    if (this.allSlices.length === 0) {
      const storeConfig: any = { reducer: {} };
      options.forEach((option) => {
        const slice = createSlice(option);
        this.allSlices.push(slice);
        storeConfig.reducer[option.name] = slice.reducer;
        this.statesAndActions[option.name] = {
          subscribeCallBacks: [],
          actions: slice.actions,
          selectors: slice.selectors,
          slice: slice,
        };
      });
      this.configureStore(storeConfig);
    } else {
      throw "'configSlicesOptions' should only be called once, but it is being called multiple times.";
    }
    return this.allSlices;
  }

  private configureStore(options: ConfigureStoreOptions) {
    this.store = configureStore(options);
    this.store.subscribe(this.handleStoreUpdate.bind(this));
    return this.store;
  }

  public static getInstance(): ReduxService {
    if (!ReduxService.instance) {
      ReduxService.instance = new ReduxService();
    }
    return ReduxService.instance;
  }

  private handleStoreUpdate() {
    Object.entries(this.store.getState()).forEach(([sliceName, state]) => {
      this.statesAndActions[sliceName].subscribeCallBacks.forEach((cb) =>
        cb(state)
      );
    });
  }

  public subscribe(
    sliceName: string,
    subscribeCallBack: (state: any) => void
  ): void {
    if (this.statesAndActions[sliceName]) {
      subscribeCallBack(this.store && this.store.getState()[sliceName]);
      this.statesAndActions[sliceName].subscribeCallBacks.push(
        subscribeCallBack
      );
      this.statesAndActions[sliceName].subscribeCallBacks.forEach((cb) =>
        cb(this.store && this.store.getState()[sliceName])
      );
    }
  }

  public get dispatch() {
    return this.store.dispatch;
  }

  public getAction(sliceName: string, actionName: string) {
    return this.statesAndActions[sliceName].actions[actionName];
  }

  public getSelectors(sliceName: string, selectorName: string) {
    return this.statesAndActions[sliceName].selectors[selectorName];
  }
}
