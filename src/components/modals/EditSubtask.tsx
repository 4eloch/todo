import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editSubtask } from "../../redux/actions/tasksActions";
import { TasksActionTypes, ITask } from "../../redux/types/tasksTypes";
import { Dispatch } from "redux";
import "../../styles/formStyles.scss";

interface IEditSubtaskProps {
  isShown: boolean;
  onHide: () => void;
  projectId: number;
  parentTaskId: number;
  subtaskId: number;
}

export const EditSubtask = ({
  isShown,
  onHide,
  projectId,
  parentTaskId,
  subtaskId,
}: IEditSubtaskProps) => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>();
  const projects = useSelector((state: any) => state.tasks.projects);
  const project = projects.find((p: any) => p.id === projectId);
  const parentTask = project?.tasks.find((t: ITask) => t.id === parentTaskId);
  const subtaskToEdit = parentTask?.subtasks.find((st: ITask) => st.id === subtaskId);

  const [title, setTitle] = useState(subtaskToEdit?.title || "");
  const [description, setDescription] = useState(subtaskToEdit?.description || "");
  const [dueDate, setDueDate] = useState(subtaskToEdit?.dueDate || "");
  const [priority, setPriority] = useState(subtaskToEdit?.priority || "Low");

  useEffect(() => {
    if (subtaskToEdit) {
      setTitle(subtaskToEdit.title);
      setDescription(subtaskToEdit.description);
      setDueDate(subtaskToEdit.dueDate);
      setPriority(subtaskToEdit.priority);
    }
  }, [subtaskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Название подзадачи не может быть пустым!");
      return;
    }
    const updatedSubtask: ITask = {
      ...subtaskToEdit,
      title,
      description,
      dueDate,
      priority,
    };
    dispatch(editSubtask({ taskId: parentTaskId, projectId, subtaskId, subtask: updatedSubtask }));
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Low");
    onHide();
  };

  return (
    <Modal show={isShown} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Редактирование подзадачи</Modal.Title>
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
          <Button className="modal-form-button" variant="primary" type="submit">
            Сохранить
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
