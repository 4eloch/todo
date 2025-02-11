import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProject, deleteProject } from "../../redux/actions/tasksActions";
import { TasksActionTypes, IProject } from "../../redux/types/tasksTypes";
import { Dispatch } from "redux";
import { Modal, Button, Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import "../../styles/projectsStyles.scss";

export const MainPage = () => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>();
  const projects = useSelector((state: any) => state.tasks.projects);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [projectName, setProjectName] = useState("");

  const handleAddProject = () => {
    setShowAddProjectModal(true);
  };

  const handleCloseAddProjectModal = () => {
    setShowAddProjectModal(false);
    setProjectName("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) {
      alert("Название проекта не может быть пустым!");
      return;
    }
    const newProject: IProject = {
      id: Date.now(),
      name: projectName,
      tasks: [],
    };
    dispatch(addProject(newProject));
    setProjectName("");
    handleCloseAddProjectModal();
  };

  const handleDeleteProject = (projectId: number) => {
    if (window.confirm("Вы уверены, что хотите удалить этот проект?")) {
      dispatch(deleteProject(projectId));
    }
  };

  return (
    <div className="projects-page">
      <h1 className="projects-title">Проекты</h1>
      <ul className="projects-list">
        {projects.map((project: IProject) => (
          <li key={project.id} className="project-item">
            <Link to={`/project/${project.id}`}>{project.name}</Link>
            <button
              className="delete-project-button"
              onClick={() => handleDeleteProject(project.id)}
              style={{
                background: "none",
                borderRadius: "50%",
              }}
            >
              <FaTrash size={16} color="#dc3545" />
            </button>
          </li>
        ))}
      </ul>
      <button className="add-project-button" onClick={handleAddProject}>
        Добавить проект
      </button>
      <Modal
        show={showAddProjectModal}
        onHide={handleCloseAddProjectModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Добавление проекта</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formProjectName">
              <Form.Label>Название проекта</Form.Label>
              <Form.Control
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
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
    </div>
  );
};
