import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSubtask, editSubtask } from "../../redux/actions/tasksActions";
import { TasksActionTypes, ITask } from "../../redux/types/tasksTypes";
import { Dispatch } from "redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "../../styles/taskStyles.scss";
import { EditSubtask } from "../modals";

interface ISubtaskSectionProps {
  subtasks: ITask[];
  projectId: number;
  parentTaskId: number;
}

export const SubtaskSection = ({ subtasks, projectId, parentTaskId }: ISubtaskSectionProps) => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>();
  const [showEditSubtaskModal, setShowEditSubtaskModal] = useState(false);
  const [editingSubtaskId, setEditingSubtaskId] = useState<number | undefined>(undefined);

  const handleDeleteSubtask = (subtaskId: number) => {
    if (window.confirm("Вы уверены, что хотите удалить эту подзадачу?")) {
      dispatch(deleteSubtask({ projectId, taskId: parentTaskId, subtaskId }));
    }
  };

  const handleToggleSubtaskCompletion = (subtaskId: number, isCompleted: boolean) => {
    const updatedSubtask = subtasks.find((st) => st.id === subtaskId);
    if (!updatedSubtask) return;

    const updatedTask: ITask = {
      ...updatedSubtask,
      isCompleted,
    };

    dispatch(editSubtask({ taskId: parentTaskId, projectId, subtaskId, subtask: updatedTask }));
  };

  const handleEditSubtask = (subtaskId: number) => {
    setEditingSubtaskId(subtaskId);
    setShowEditSubtaskModal(true);
  };

  const handleCloseEditSubtaskModal = () => {
    setShowEditSubtaskModal(false);
    setEditingSubtaskId(undefined);
  };

  return (
    <div className="subtask-section">
      <h4>Подзадачи</h4>
      {subtasks.map((subtask) => (
        <div
          key={subtask.id}
          className="subtask-card"
          style={{
            marginLeft: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Чекбокс выполнения подзадачи */}
            <button
              className="toggle-subtask-completion-button"
              onClick={() => handleToggleSubtaskCompletion(subtask.id, !subtask.isCompleted)}
              style={{
                background: subtask.isCompleted ? "#28a745" : "#ffc107",
                color: subtask.isCompleted ? "#fff" : "#000",
                border: "none",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              title={subtask.isCompleted ? "Снять отметку выполнения" : "Отметить как выполненное"}
            >
              {subtask.isCompleted && "✓"}
            </button>

            <h5
              className="subtask-title"
              style={{
                textAlign: "left",
                textDecoration: subtask.isCompleted ? "line-through" : "none",
                color: subtask.isCompleted ? "#6c757d" : "#333",
                marginLeft: "10px",
                whiteSpace: "normal",
                wordBreak: "break-word",
                display: "inline-block",
                verticalAlign: "middle",
              }}
            >
              {subtask.title}
            </h5>
          </div>
          {/* Блок действий */}
          <div
            className="subtask-actions"
            style={{ display: "flex", gap: "10px", marginLeft: "10px" }}
          >
            {/* Кнопка редактирования (карандаш) с tooltip */}
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="edit-subtask-tooltip">Редактировать подзадачу</Tooltip>}
            >
              <button
                className="edit-subtask-button"
                onClick={() => handleEditSubtask(subtask.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#007bff",
                  transition: "color 0.2s ease",
                }}
              >
                <FaEdit size={16} />
              </button>
            </OverlayTrigger>

            {/* Кнопка удаления (мусорное ведро) с tooltip */}
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="delete-subtask-tooltip">Удалить подзадачу</Tooltip>}
            >
              <button
                className="delete-subtask-button"
                onClick={() => handleDeleteSubtask(subtask.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#dc3545",
                  transition: "color 0.2s ease",
                }}
              >
                <FaTrash size={16} />
              </button>
            </OverlayTrigger>
          </div>
        </div>
      ))}

      <EditSubtask
        isShown={showEditSubtaskModal}
        onHide={handleCloseEditSubtaskModal}
        projectId={projectId}
        parentTaskId={parentTaskId}
        subtaskId={editingSubtaskId || 0}
      />
    </div>
  );
};
