import { createAction, handleActions } from 'redux-actions';
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

const LOGIN = 'login';
const LOGIN_FETCHING = 'login_fetching';
const LOGIN_SUCCESS = 'login_success';
const LOGOUT = 'logout';

export const login = createAction(LOGIN);
export const loginFetching = createAction(LOGIN_FETCHING);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const logout = createAction(LOGOUT);

const initialState = {
  isLoginFetching: false,
  isLogin: false,
  name: null,
  age: null,
};

const reducer = handleActions(
  {
    [LOGIN_FETCHING]: (state = initialState, action) => {
      return {
        ...state,
        isLoginFetching: true,
      };
    },
    [LOGIN_SUCCESS]: (state = initialState, action) => {
      return {
        ...state,
        isLogin: true,
        name: action.payload.name,
        age: action.payload.age,
        isLoginFetching: false,
      };
    },
  },
  initialState,
);

const delay = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

// SAGA function
function* loginSaga(action) {
  console.log('[ START SAGA FUNCTION ]');
  console.log('-- fetching --');
  yield put(loginFetching());
  console.log('-- delay --');
  yield delay();
  const { data } = yield axios.get('https://jsonplaceholder.typicode.com/todos/1');
  console.log(`-- 로그인${JSON.stringify(data)} --`);
  yield put(
    loginSuccess({
      age: data.id,
      name: data.title,
    }),
  );
}

// SAGA watcher
export function* authSaga() {
  yield takeEvery(LOGIN, loginSaga);
}

export default reducer;
