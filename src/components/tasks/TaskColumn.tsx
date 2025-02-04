import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import { editTask } from "../../redux/actions/tasksActions";
import { TasksActionTypes, ITask } from "../../redux/types/tasksTypes";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

interface TaskColumnProps {
  title: string;
  tasks: ITask[];
  filteredTasks: ITask[];
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  tasks,
  filteredTasks,
}) => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>();
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item: any) => {
      const taskToUpdate = filteredTasks.find((task) => task.id === item.id);

      if (!taskToUpdate) return;

      const updatedTask: ITask = {
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
