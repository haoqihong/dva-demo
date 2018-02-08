import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch({ payload: { page } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetch, { page });
      yield put({ type: 'save', payload: { data, total: headers['x-total-count'], page: parseInt(page, 10) } });  //相当于执行dispatch
    },
    *create({ payload: values }, { call, put }) {
      let aa = yield call(usersService.create, values);
      console.log(aa)
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => {
        return state.users.page
      });
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
