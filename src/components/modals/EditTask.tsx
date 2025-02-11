import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../../redux/actions/tasksActions";
import { ITask, TasksActionTypes } from "../../redux/types/tasksTypes";
import { Dispatch } from "redux";
import "../../styles/formStyles.scss";

interface IEditTaskProps {
  isShown: boolean;
  onHide: () => void;
  task: ITask;
}

export const EditTask = ({ isShown, onHide, task }: IEditTaskProps) => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
      setPriority(task.priority);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Название задачи не может быть пустым!");
      return;
    }
    const updatedTask: ITask = {
      ...task,
      title,
      description,
      dueDate,
      priority,
    };
    dispatch(editTask(updatedTask));
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Low");
    onHide();
  };

  return (
    <Modal show={isShown} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Редактирование задачи</Modal.Title>
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
