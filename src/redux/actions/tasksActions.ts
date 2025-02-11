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
  ADD_SUBTASK,
  DELETE_SUBTASK,
  EDIT_SUBTASK,
} from "../constants";
import {
  ITask,
  IProject,
  IAddTaskAction,
  IEditTaskAction,
  IDeleteTaskAction,
  IAddSubtaskAction,
  IEditSubtaskAction,
  IDeleteSubtaskAction,
  ISetSearchQueryAction,
  IToggleTaskCompletionAction,
  IUpdateTaskTimeAction,
  IAddProjectAction,
  IDeleteProjectAction,
  ISetCurrentProjectAction,
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

export const addSubtask = (payload: {
  taskId: number;
  projectId: number;
  subtask: ITask;
}): IAddSubtaskAction => ({
  type: ADD_SUBTASK,
  payload,
});

export const editSubtask = (payload: {
  taskId: number;
  projectId: number;
  subtaskId: number;
  subtask: ITask;
}): IEditSubtaskAction => ({
  type: EDIT_SUBTASK,
  payload,
});

export const deleteSubtask = (payload: {
  taskId: number;
  projectId: number;
  subtaskId: number;
}): IDeleteSubtaskAction => ({
  type: DELETE_SUBTASK,
  payload,
});

export const setSearchQuery = (query: string): ISetSearchQueryAction => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

export const toggleTaskCompletion = (payload: {
  taskId: number;
  projectId: number;
  isCompleted: boolean;
}): IToggleTaskCompletionAction => ({
  type: TOGGLE_TASK_COMPLETION,
  payload,
});

export const updateTaskTime = (payload: {
  taskId: number;
  projectId: number;
  timeSpent: number;
}): IUpdateTaskTimeAction => ({
  type: UPDATE_TASK_TIME,
  payload,
});

export const addProject = (project: IProject): IAddProjectAction => ({
  type: ADD_PROJECT,
  payload: project,
});

export const deleteProject = (projectId: number): IDeleteProjectAction => ({
  type: DELETE_PROJECT,
  payload: projectId,
});

export const setCurrentProject = (projectId: number): ISetCurrentProjectAction => ({
  type: SET_CURRENT_PROJECT,
  payload: projectId,
});
