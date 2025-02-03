import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
//@ts-ignore
import { addTask, Task } from "../../redux/actions/tasksActions";
import { Dispatch } from "redux";
import "../../styles/formStyles.scss";

interface AddTaskModalProps {
  show: boolean;
  onHide: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ show, onHide }) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: Date.now(),
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
    };
    dispatch(addTask(newTask));
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Добавление задачи</Modal.Title>
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
          <Form.Group className="modal-form-group" controlId="formDescription">
            <Form.Label className="modal-form-label">Описание</Form.Label>
            <Form.Control
              className="modal-form-control"
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="modal-form-group" controlId="formDueDate">
            <Form.Label className="modal-form-label">Дата окончания</Form.Label>
            <Form.Control
              className="modal-form-control"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="modal-form-group" controlId="formPriority">
            <Form.Label className="modal-form-label">Приоритет</Form.Label>
            <Form.Control
              className="modal-form-control"
              as="select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="Low">Низкий</option>
              <option value="Medium">Средний</option>
              <option value="High">Высокий</option>
            </Form.Control>
          </Form.Group>
          <Button className="modal-form-button" variant="primary" type="submit">
            Сохранить
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTaskModal;
