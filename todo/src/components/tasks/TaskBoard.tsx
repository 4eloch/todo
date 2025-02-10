import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "./TaskColumn";
import { useSelector } from "react-redux";
import AddTask from "../modals/AddTask";
import { ITask } from "../../redux/types/tasksTypes";

interface TaskBoardProps {
  tasks: ITask[];
  projectId: number;
}

const TaskBoard = ({ tasks, projectId }: TaskBoardProps) => {
  const searchQuery = useSelector((state: any) => state.tasks.searchQuery);
  const filteredTasks = tasks.filter(
    (task: ITask) =>
      String(task.id).includes(searchQuery) ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const columns = {
    Queue: filteredTasks.filter((task: ITask) => task.status === "Queue"),
    Development: filteredTasks.filter(
      (task: ITask) => task.status === "Development"
    ),
    Done: filteredTasks.filter((task: ITask) => task.status === "Done"),
  };
  const [showAddTaskModal, setShowAddTaskModal] = React.useState(false);

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
        <AddTask
          isShown={showAddTaskModal}
          onHide={handleCloseAddTaskModal}
          projectId={projectId}
        />
      </div>
    </DndProvider>
  );
};

export default TaskBoard;
