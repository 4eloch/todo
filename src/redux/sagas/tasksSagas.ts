//@ts-ignore
import { put, takeEvery } from "redux-saga/effects";
import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  ADD_COMMENT,
  TasksActionTypes,
} from "../types/tasksTypes";

function* addTaskSaga(action: TasksActionTypes) {
  // Логика добавления задачи
  yield put({ type: "TASK_ADDED", payload: action.payload });
}

function* editTaskSaga(action: TasksActionTypes) {
  // Логика редактирования задачи
  yield put({ type: "TASK_EDITED", payload: action.payload });
}

function* deleteTaskSaga(action: TasksActionTypes) {
  // Логика удаления задачи
  yield put({ type: "TASK_DELETED", payload: action.payload });
}

function* addCommentSaga(action: TasksActionTypes) {
  // Логика добавления комментария
  yield put({ type: "COMMENT_ADDED", payload: action.payload });
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
