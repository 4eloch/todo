import React from "react";
import { Link } from "react-router-dom";
import "../../styles/projectsStyles.scss";

const ProjectsPage: React.FC = () => (
  <div className="projects-page">
    <h1 className="projects-title">Проекты</h1>
    <ul className="projects-list">
      <li className="project-item">
        <Link to="/tasks/1">Проект 1</Link>
      </li>
      <li className="project-item">
        <Link to="/tasks/2">Проект 2</Link>
      </li>
      <li className="project-item">
        <Link to="/tasks/3">Проект 3</Link>
      </li>
    </ul>
  </div>
);

export default ProjectsPage;
