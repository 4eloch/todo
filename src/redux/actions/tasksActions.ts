import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  SET_SEARCH_QUERY,
  TOGGLE_TASK_COMPLETION,
  UPDATE_TASK_TIME,
  ADD_PROJECT,
  DELETE_PROJECT,
  SET_CURRENT_PROJECT,
} from "../constants";
import {
  ITask,
  IAddTaskAction,
  IEditTaskAction,
  IDeleteTaskAction,
  IProject,
} from "../types/tasksTypes";

export const addTask = (task: ITask): IAddTaskAction => ({
  type: ADD_TASK,
  payload: task,
});

export const editTask = (task: ITask): IEditTaskAction => ({
  type: EDIT_TASK,
  payload: task,
});

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

export const addProject = (
  project: IProject
): { type: typeof ADD_PROJECT; payload: IProject } => ({
  type: ADD_PROJECT,
  payload: project,
});

export const deleteProject = (
  projectId: number
): { type: typeof DELETE_PROJECT; payload: number } => ({
  type: DELETE_PROJECT,
  payload: projectId,
});

export const setCurrentProject = (
  projectId: number
): { type: typeof SET_CURRENT_PROJECT; payload: number } => ({
  type: SET_CURRENT_PROJECT,
  payload: projectId,
});
