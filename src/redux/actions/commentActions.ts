import { ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT } from "../constants";
import {
  IComment,
  IEditCommentAction,
  IAddCommentAction,
  IDeleteCommentAction,
} from "../types/tasksTypes";

export const addComment = (payload: {
  taskId: number;
  projectId: number;
  parentId?: number;
  comment: IComment;
}): IAddCommentAction => ({
  type: ADD_COMMENT,
  payload,
});

export const editComment = (payload: {
  taskId: number;
  projectId: number;
  commentId: number;
  newText: string;
}): IEditCommentAction => ({
  type: EDIT_COMMENT,
  payload,
});

export const deleteComment = (payload: {
  taskId: number;
  projectId: number;
  commentId: number;
}): IDeleteCommentAction => ({
  type: DELETE_COMMENT,
  payload,
});
