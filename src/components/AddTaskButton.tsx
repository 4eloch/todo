import React from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import AddTaskModal from "./modals/AddTaskModal";

const AddTaskButton: React.FC = () => {
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
      {/* Модальное окно для добавления задачи */}
      <AddTaskModal show={showAddTaskModal} onHide={handleCloseAddTaskModal} />
    </>
  );
};

export default AddTaskButton;
