import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editComment } from "../../redux/actions";
import { TasksActionTypes, IComment, ITask } from "../../redux/types/tasksTypes";
import { Dispatch } from "redux";

interface IEditCommentProps {
  isShown: boolean;
  onHide: () => void;
  taskId: number;
  commentId: number;
}

export const EditComment = ({ isShown, onHide, taskId, commentId }: IEditCommentProps) => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>();
  const tasks = useSelector((state: any) => state.tasks.tasks);
  const task = tasks.find((t: ITask) => t.id === taskId);
  const commentToEdit = task?.comments.find((c: IComment) => c.id === commentId);

  const [commentText, setCommentText] = useState(commentToEdit?.text || "");

  useEffect(() => {
    if (commentToEdit) {
      setCommentText(commentToEdit.text);
    }
  }, [commentToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText.trim()) {
      alert("Текст комментария не может быть пустым!");
      return;
    }

    dispatch(editComment(taskId, commentId, commentText));
    onHide();
  };

  return (
    <Modal show={isShown} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Редактирование комментария</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCommentText">
            <Form.Label>Текст комментария</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Сохранить
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
