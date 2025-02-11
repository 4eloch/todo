import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  ADD_SUBTASK,
  EDIT_SUBTASK,
  DELETE_SUBTASK,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  TOGGLE_TASK_COMPLETION,
  UPDATE_TASK_TIME,
  SET_SEARCH_QUERY,
  ADD_PROJECT,
  DELETE_PROJECT,
  SET_CURRENT_PROJECT,
} from "../constants";

export interface ITask {
  id: number;
  projectId: number;
  title: string;
  description: string;
  createdAt: string;
  timeSpent: number;
  dueDate: string;
  priority: string;
  status: string;
  subtasks: ITask[];
  comments: IComment[];
  files: string[];
  isCompleted: boolean;
}

export interface IComment {
  id: number;
  text: string;
  replies: IComment[];
  isDeleted?: boolean;
}

export interface IProject {
  id: number;
  name: string;
  tasks: ITask[];
}

export interface IAddTaskAction {
  type: typeof ADD_TASK;
  payload: ITask;
}

export interface IEditTaskAction {
  type: typeof EDIT_TASK;
  payload: ITask;
}

export interface IDeleteTaskAction {
  type: typeof DELETE_TASK;
  payload: number;
}

export interface IAddSubtaskAction {
  type: typeof ADD_SUBTASK;
  payload: { taskId: number; projectId: number; subtask: ITask };
}

export interface IEditSubtaskAction {
  type: typeof EDIT_SUBTASK;
  payload: { taskId: number; projectId: number; subtaskId: number; subtask: ITask };
}

export interface IDeleteSubtaskAction {
  type: typeof DELETE_SUBTASK;
  payload: { taskId: number; projectId: number; subtaskId: number };
}

export interface IAddCommentAction {
  type: typeof ADD_COMMENT;
  payload: { taskId: number; parentId?: number; comment: IComment };
}

export interface IEditCommentAction {
  type: typeof EDIT_COMMENT;
  payload: {
    taskId: number;
    commentId: number;
    newText: string;
  };
}

export interface IDeleteCommentAction {
  type: typeof DELETE_COMMENT;
  payload: {
    taskId: number;
    commentId: number;
  };
}

export interface ISetSearchQueryAction {
  type: typeof SET_SEARCH_QUERY;
  payload: string;
}

export interface IToggleTaskCompletionAction {
  type: typeof TOGGLE_TASK_COMPLETION;
  payload: {
    taskId: number;
    projectId: number;
    isCompleted: boolean;
  };
}

export interface IUpdateTaskTimeAction {
  type: typeof UPDATE_TASK_TIME;
  payload: {
    taskId: number;
    timeSpent: number;
  };
}

export interface IAddProjectAction {
  type: typeof ADD_PROJECT;
  payload: IProject;
}

export interface IDeleteProjectAction {
  type: typeof DELETE_PROJECT;
  payload: number;
}

export interface ISetCurrentProjectAction {
  type: typeof SET_CURRENT_PROJECT;
  payload: number;
}

export type TasksActionTypes =
  | IAddTaskAction
  | IEditTaskAction
  | IDeleteTaskAction
  | IAddSubtaskAction
  | IEditSubtaskAction
  | IDeleteSubtaskAction
  | IEditCommentAction
  | IAddCommentAction
  | IDeleteCommentAction
  | ISetSearchQueryAction
  | IToggleTaskCompletionAction
  | IUpdateTaskTimeAction
  | IAddProjectAction
  | IDeleteProjectAction
  | ISetCurrentProjectAction;
