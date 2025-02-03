import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import {
  editTask,
  //@ts-ignore
  TasksActionTypes,
  //@ts-ignore
  Task,
} from "../../redux/actions/tasksActions";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  filteredTasks: Task[];
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  tasks,
  filteredTasks,
}) => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>(); // Типизируем dispatch

  // Настройка drop для колонки
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item: any) => {
      const taskToUpdate = filteredTasks.find((task) => task.id === item.id);

      if (!taskToUpdate) return;

      const updatedTask: Task = {
        ...taskToUpdate,
        status: title,
      };

      dispatch(editTask(updatedTask));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`task-column ${isOver ? "over" : ""}`}>
      <h2>{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskColumn;
