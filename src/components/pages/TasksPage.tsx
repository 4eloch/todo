import React from "react";
import TaskBoard from "../tasks/TaskBoard";
import SearchBar from "../SearchBar";
import AddTaskButton from "../AddTaskButton";

const TasksPage: React.FC = () => {
  return (
    <div className="tasks-page">
      {/* Заголовок страницы с задачами */}
      <header className="tasks-header">
        <h1 className="tasks-title">Задачи</h1>
        {/* Контейнер для поисковой строки и кнопок */}
        <div className="tasks-actions">
          <SearchBar /> {/* Компонент поисковой строки */}
          <AddTaskButton /> {/* Компонент кнопки "Добавить задачу" */}
        </div>
      </header>

      {/* Доска задач */}
      <TaskBoard />
    </div>
  );
};

export default TasksPage;
