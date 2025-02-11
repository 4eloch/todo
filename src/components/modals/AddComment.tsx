import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../redux/actions";
import { TasksActionTypes, ITask, IComment } from "../../redux/types/tasksTypes";
import { Dispatch } from "redux";

interface IAddCommentProps {
  isShown: boolean;
  onHide: () => void;
  taskId: number;
  parentId?: number;
}

export const AddComment = ({ isShown, onHide, taskId, parentId }: IAddCommentProps) => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>();
  const projectId = useSelector((state: any) => state.currentProjectId);

  useEffect(() => {
    console.log(projectId);
  }, []);

  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) {
      alert("Текст комментария не может быть пустым!");
      return;
    }

    const newComment: IComment = {
      id: Date.now(),
      text: commentText,
      replies: [],
    };
    dispatch(addComment(taskId, newComment, parentId));
    setCommentText("");
    onHide();
  };

  return (
    <Modal show={isShown} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{parentId ? "Добавить ответ" : "Добавить комментарий"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formComment">
            <Form.Label>Комментарий</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit" style={{ width: "100%" }}>
            Сохранить
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
