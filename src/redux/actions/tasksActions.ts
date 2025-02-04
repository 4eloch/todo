import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  SET_SEARCH_QUERY,
  TOGGLE_TASK_COMPLETION,
  UPDATE_TASK_TIME,
} from "../constants";
import {
  ITask,
  IAddTaskAction,
  IEditTaskAction,
  IDeleteTaskAction,
} from "../types/tasksTypes";

// Создание новой задачи
export const addTask = (task: ITask): IAddTaskAction => ({
  type: ADD_TASK,
  payload: task,
});

// Редактирование задачи
export const editTask = (task: ITask): IEditTaskAction => ({
  type: EDIT_TASK,
  payload: task,
});

// Удаление задачи
export const deleteTask = (taskId: number): IDeleteTaskAction => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const setSearchQuery = (
  query: string
): { type: typeof SET_SEARCH_QUERY; payload: string } => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

// Экшен для изменения состояния выполнения задачи
export const toggleTaskCompletion = (
  taskId: number,
  isCompleted: boolean
): {
  type: typeof TOGGLE_TASK_COMPLETION;
  payload: { taskId: number; isCompleted: boolean };
} => ({
  type: TOGGLE_TASK_COMPLETION,
  payload: { taskId, isCompleted },
});

// Экшен для обновления времени задачи
export const updateTaskTime = (
  taskId: number,
  timeSpent: number
): {
  type: typeof UPDATE_TASK_TIME;
  payload: { taskId: number; timeSpent: number };
} => ({
  type: UPDATE_TASK_TIME,
  payload: { taskId, timeSpent },
});
