import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addComment } from "../../redux/actions/tasksActions";
import { TasksActionTypes, IComment } from "../../redux/types/tasksTypes";
import { Dispatch } from "redux";

interface AddCommentModalProps {
  show: boolean;
  onHide: () => void;
  taskId: number;
  parentId?: number;
}

const AddCommentModal: React.FC<AddCommentModalProps> = ({
  show,
  onHide,
  taskId,
  parentId,
}) => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>();
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newComment: IComment = {
      id: Date.now(),
      text: commentText,
      replies: [],
    };

    dispatch(addComment(taskId, newComment, parentId));
    setCommentText(""); // Сбрасываем текст
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          {parentId ? "Добавить ответ" : "Добавить комментарий"}
        </Modal.Title>
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
          <Button variant="primary" type="submit">
            Сохранить
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCommentModal;
