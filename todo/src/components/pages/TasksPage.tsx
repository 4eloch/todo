import TaskBoard from "../tasks/TaskBoard";
import SearchBar from "../SearchBar";
import AddTaskButton from "../AddTaskButton";

const TasksPage = () => {
  return (
    <div className="tasks-page">
      <header className="tasks-header">
        <h1 className="tasks-title">Задачи</h1>
        <div className="tasks-actions">
          <SearchBar />
          <AddTaskButton />
        </div>
      </header>
      <TaskBoard />
    </div>
  );
};

export default TasksPage;
