import { CreateSliceOptions } from '@reduxjs/toolkit';

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
  selectors:{
    selectCount: (counter) => counter.counter,
  },
};

export const usersSliceOption: CreateSliceOptions = {
  name: 'users',
  initialState: {
    users: [
      'Ranjit',
      'Vamsee'
    ],
  },
  reducers: {
    deleteAll: (state) => {
      state.users = []
    },
  },
  selectors:{
    selectCount: (counter) => counter.counter,
  }
};
