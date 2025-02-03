import React from "react";
import TaskBoard from "../tasks/TaskBoard";
import SearchBar from "../tasks/Buttons/SearchBar";
import AddTaskButton from "../tasks/Buttons/AddTaskButton";

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
