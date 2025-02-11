import { ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT } from "../constants";
import { IComment } from "../types/tasksTypes";

export const addComment = (
  taskId: number,
  comment: IComment,
  parentId?: number
): {
  type: typeof ADD_COMMENT;
  payload: { taskId: number; parentId?: number; comment: IComment };
} => ({
  type: ADD_COMMENT,
  payload: { taskId, comment, parentId },
});

export const editComment = (
  taskId: number,
  commentId: number,
  newText: string
): {
  type: typeof EDIT_COMMENT;
  payload: { taskId: number; commentId: number; newText: string };
} => ({
  type: EDIT_COMMENT,
  payload: { taskId, commentId, newText },
});

export const deleteComment = (
  taskId: number,
  commentId: number
): {
  type: typeof DELETE_COMMENT;
  payload: { taskId: number; commentId: number };
} => ({
  type: DELETE_COMMENT,
  payload: { taskId, commentId },
});
