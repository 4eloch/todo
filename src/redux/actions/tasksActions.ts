import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  ADD_COMMENT,
  SET_SEARCH_QUERY,
  AddTaskAction,
  EditTaskAction,
  DeleteTaskAction,
  Task,
  Comment,
} from "../types/tasksTypes";

// Создание новой задачи
export const addTask = (task: Task): AddTaskAction => ({
  type: ADD_TASK,
  payload: task,
});

// Редактирование задачи
export const editTask = (task: Task): EditTaskAction => ({
  type: EDIT_TASK,
  payload: task,
});

// Удаление задачи
export const deleteTask = (taskId: number): DeleteTaskAction => ({
  type: DELETE_TASK,
  payload: taskId,
});

// Добавление комментария к задаче
export const addComment = (
  taskId: number,
  parentId?: number,
  //@ts-ignore
  comment: Comment
): {
  type: typeof ADD_COMMENT;
  payload: { taskId: number; parentId?: number; comment: Comment };
} => ({
  type: ADD_COMMENT,
  payload: { taskId, parentId, comment },
});

export const deleteComment = (
  taskId: number,
  commentId: number
): {
  type: "DELETE_COMMENT";
  payload: { taskId: number; commentId: number };
} => ({
  type: "DELETE_COMMENT",
  payload: { taskId, commentId },
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
  type: "TOGGLE_TASK_COMPLETION";
  payload: { taskId: number; isCompleted: boolean };
} => ({
  type: "TOGGLE_TASK_COMPLETION",
  payload: { taskId, isCompleted },
});

// Экшен для обновления времени задачи
export const updateTaskTime = (
  taskId: number,
  timeSpent: number
): {
  type: "UPDATE_TASK_TIME";
  payload: { taskId: number; timeSpent: number };
} => ({
  type: "UPDATE_TASK_TIME",
  payload: { taskId, timeSpent },
});
