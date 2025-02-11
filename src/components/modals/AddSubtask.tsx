import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addSubtask } from "../../redux/actions/tasksActions";
import { TasksActionTypes, ITask } from "../../redux/types/tasksTypes";
import { Dispatch } from "redux";
import "../../styles/formStyles.scss";

interface IAddSubtaskProps {
  isShown: boolean;
  onHide: () => void;
  taskId: number;
  projectId: number;
}

export const AddSubtask = ({ isShown, onHide, taskId, projectId }: IAddSubtaskProps) => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Название подзадачи не может быть пустым!");
      return;
    }
    const newSubtask: ITask = {
      id: Date.now(),
      projectId: projectId,
      title,
      description,
      dueDate,
      priority,
      createdAt: new Date().toISOString(),
      timeSpent: 0,
      files: [],
      status: "Queue",
      subtasks: [],
      comments: [],
      isCompleted: false,
    };
    dispatch(addSubtask({ taskId, projectId, subtask: newSubtask }));
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Low");
    onHide();
  };

  return (
    <Modal show={isShown} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Добавление подзадачи</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="modal-form" onSubmit={handleSubmit}>
          <Form.Group className="modal-form-group" controlId="formTitle">
            <Form.Label className="modal-form-label">Название</Form.Label>
            <Form.Control
              className="modal-form-control"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
