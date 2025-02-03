// src/components/tasks/TaskBoard.tsx
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "./TaskColumn";
import { useSelector, useDispatch } from "react-redux";
import AddTaskModal from "../modals/AddTaskModal";
//@ts-ignore
import { setSearchQuery, Task } from "../../redux/actions/tasksActions";
import { Dispatch } from "redux";

const TaskBoard: React.FC = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const tasks = useSelector((state: any) => state.tasks.tasks);
  const searchQuery = useSelector((state: any) => state.tasks.searchQuery); // Получаем запрос из Redux

  // Фильтрация задач по номеру (id) или заголовку (title)
  const filteredTasks = tasks.filter(
    (task: Task) =>
      String(task.id).includes(searchQuery) ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Разделение задач по статусам после фильтрации
  const columns = {
    Queue: filteredTasks.filter((task: Task) => task.status === "Queue"),
    Development: filteredTasks.filter(
      (task: Task) => task.status === "Development"
    ),
    Done: filteredTasks.filter((task: Task) => task.status === "Done"),
  };

  // Состояние модального окна для добавления задачи
  const [showAddTaskModal, setShowAddTaskModal] = React.useState(false);

  const handleAddTask = () => {
    setShowAddTaskModal(true);
  };

  const handleCloseAddTaskModal = () => {
    setShowAddTaskModal(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="task-board">
        <TaskColumn
          title="Queue"
          tasks={columns.Queue}
          filteredTasks={filteredTasks}
        />
        <TaskColumn
          title="Development"
          tasks={columns.Development}
          filteredTasks={filteredTasks}
        />
        <TaskColumn
          title="Done"
          tasks={columns.Done}
          filteredTasks={filteredTasks}
        />

        {/* Модальное окно для добавления задачи */}
        <AddTaskModal
          show={showAddTaskModal}
          onHide={handleCloseAddTaskModal}
        />
      </div>
    </DndProvider>
  );
};

export default TaskBoard;
