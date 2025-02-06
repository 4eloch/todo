//@ts-ignore
import { put, takeEvery } from "redux-saga/effects";
import { TasksActionTypes } from "../types/tasksTypes";
import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  ADD_COMMENT,
  COMMENT_ADDED,
  TASK_ADDED,
  TASK_DELETED,
  TASK_EDITED,
} from "../constants";

function* addTaskSaga(action: TasksActionTypes) {
  yield put({ type: TASK_ADDED, payload: action.payload });
}

function* editTaskSaga(action: TasksActionTypes) {
  yield put({ type: TASK_EDITED, payload: action.payload });
}

function* deleteTaskSaga(action: TasksActionTypes) {
  yield put({ type: TASK_DELETED, payload: action.payload });
}

function* addCommentSaga(action: TasksActionTypes) {
  yield put({ type: COMMENT_ADDED, payload: action.payload });
}

function* watchAddTask() {
  yield takeEvery(ADD_TASK, addTaskSaga);
}

function* watchEditTask() {
  yield takeEvery(EDIT_TASK, editTaskSaga);
}

function* watchDeleteTask() {
  yield takeEvery(DELETE_TASK, deleteTaskSaga);
}

function* watchAddComment() {
  yield takeEvery(ADD_COMMENT, addCommentSaga);
}

export default function* rootSaga() {
  yield watchAddTask();
  yield watchEditTask();
  yield watchDeleteTask();
  yield watchAddComment();
}
