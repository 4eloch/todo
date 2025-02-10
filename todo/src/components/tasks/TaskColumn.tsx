import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import { editTask } from "../../redux/actions/tasksActions";
import { TasksActionTypes, ITask } from "../../redux/types/tasksTypes";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

interface ITaskColumnProps {
  title: string;
  tasks: ITask[];
  filteredTasks: ITask[];
}

const TaskColumn = ({ title, tasks, filteredTasks }: ITaskColumnProps) => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>();

  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item: any) => {
      const taskToUpdate = filteredTasks.find((task) => task.id === item.id);
      if (!taskToUpdate) return;
      const newIsCompleted = title === "Done";
      const updatedTask: ITask = {
        ...taskToUpdate,
        status: title,
        isCompleted: newIsCompleted,
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
      {tasks?.map((task) => <TaskCard key={task.id} task={task} />)}
    </div>
  );
};

export default TaskColumn;
