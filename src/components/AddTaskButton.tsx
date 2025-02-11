import React from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { AddTask } from "./modals";

interface IAddTaskButtonProps {
  projectId: number;
}

export const AddTaskButton = ({ projectId }: IAddTaskButtonProps) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const [showAddTaskModal, setShowAddTaskModal] = React.useState(false);

  const handleAddTask = () => {
    setShowAddTaskModal(true);
  };

  const handleCloseAddTaskModal = () => {
    setShowAddTaskModal(false);
  };

  return (
    <>
      <button className="add-task-button" onClick={handleAddTask}>
        Добавить задачу
      </button>
      <AddTask isShown={showAddTaskModal} onHide={handleCloseAddTaskModal} projectId={projectId} />
    </>
  );
};
