export const ADD_TASK = "ADD_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const ADD_COMMENT = "ADD_COMMENT";
export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
export const TOGGLE_TASK_COMPLETION = "TOGGLE_TASK_COMPLETION";
export const UPDATE_TASK_TIME = "UPDATE_TASK_TIME";

export interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  timeSpent: number;
  dueDate: string;
  priority: string;
  status: string;
  subtasks: Task[];
  comments: Comment[];
  files: string[];
  isCompleted: boolean;
}

export interface Comment {
  id: number;
  text: string;
  replies: Comment[];
  isDeleted?: boolean;
}

export interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: Task;
}

export interface EditTaskAction {
  type: typeof EDIT_TASK;
  payload: Task;
}

export interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  payload: number;
}

export interface AddCommentAction {
  type: typeof ADD_COMMENT;
  payload: { taskId: number; parentId?: number; comment: Comment };
}

export interface SetSearchQueryAction {
  type: typeof SET_SEARCH_QUERY;
  payload: string;
}

export interface ToggleTaskCompletionAction {
  type: typeof TOGGLE_TASK_COMPLETION;
  payload: {
    taskId: number; // ID задачи
    isCompleted: boolean; // Новое состояние выполнения
  };
}

export interface UpdateTaskTimeAction {
  type: typeof UPDATE_TASK_TIME;
  payload: {
    taskId: number; // ID задачи
    timeSpent: number; // Обновленное время в секундах
  };
}

export type TasksActionTypes =
  | AddTaskAction
  | EditTaskAction
  | DeleteTaskAction
  | AddCommentAction
  | SetSearchQueryAction
  | ToggleTaskCompletionAction
  | UpdateTaskTimeAction;
