import { all } from "redux-saga/effects";

import { authSaga } from "./auth/index";
import { boardSaga } from "./board";

export default function* saga() {
  yield all([authSaga(), boardSaga()]);
}
