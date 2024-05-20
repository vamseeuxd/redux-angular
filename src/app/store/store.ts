import { CreateSliceOptions, createSlice } from '@reduxjs/toolkit';
import { ReduxService } from './redux-service';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    counter: 0,
  },
  reducers: {
    incremented: (state) => {
      state.counter += 1;
    },
    decremented: (state) => {
      state.counter -= 1;
    },
  },
});

export const counterSliceOption: CreateSliceOptions = {
  name: 'counter',
  initialState: {
    counter: 0,
  },
  reducers: {
    incremented: (state) => {
      state.counter += 1;
    },
    decremented: (state) => {
      state.counter -= 1;
    },
  },
};
