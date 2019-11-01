import { createAction, handleActions } from "redux-actions";
import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

// 액션타입
const GET_BOARD = "GET_BOARD";
const GET_BOARD_SUCCESS = "GET_BOARD_SUCCESS";

// 액션크리에이터
export const getBoard = createAction(GET_BOARD);
const getBoardSuccess = createAction(GET_BOARD_SUCCESS);
// export const getBoardSuccess = createAction(types.GET_BOARD_SUCCESS);

// 초기상태
const initialState = {
  boards: null
};

// 리듀서
const reducer = handleActions(
  {
    [GET_BOARD_SUCCESS]: (state = initialState, action) => {
      return {
        ...state,
        boards: [
          action.payload,
          action.payload,
          action.payload,
          action.payload,
          action.payload
        ]
      };
    }
  },
  initialState
);

// SAGA function
function* getBoardSaga(action) {
  const { data } = yield axios.get(
    "https://jsonplaceholder.typicode.com/todos/1"
  );
  yield put(getBoardSuccess(data));
}

// SAGA watcher
export function* boardSaga() {
  yield takeEvery(GET_BOARD, getBoardSaga);
}

export default reducer;
