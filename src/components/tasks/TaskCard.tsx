import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import EditTask from "../modals/EditTask";
import AddCommentModal from "../modals/AddComment";
import NestedCommentsSection from "./NestedCommentsSection";
import { FaEdit, FaTrash, FaPaperclip } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  deleteTask,
  toggleTaskCompletion,
  updateTaskTime,
} from "../../redux/actions/tasksActions";
import { TasksActionTypes, ITask } from "../../redux/types/tasksTypes";
import { Dispatch } from "redux";

interface ITaskCardProps {
  task: ITask;
}

const TaskCard = ({ task }: ITaskCardProps) => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>();

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showAddCommentModal, setShowAddCommentModal] = React.useState(false);
  const [localTimeSpent, setLocalTimeSpent] = useState(task.timeSpent);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleAddComment = () => {
    setShowAddCommentModal(true);
  };

  const handleCloseAddCommentModal = () => {
    setShowAddCommentModal(false);
  };

  const handleDelete = (id: any) => {
    if (window.confirm("Вы уверены, что хотите удалить эту задачу?")) {
      dispatch(deleteTask(task.id));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      const updatedTask: ITask = {
        ...task,
        files: [...task.files, ...newFiles],
      };
      dispatch({ type: "EDIT_TASK", payload: updatedTask });
    }
  };

  const handleFileRemove = (index: number) => {
    const updatedTask: ITask = {
      ...task,
      files: task.files.filter((_: any, i: any) => i !== index),
    };
    dispatch({ type: "EDIT_TASK", payload: updatedTask });
  };

  const handleToggleCompletion = () => {
    dispatch(toggleTaskCompletion(task.id, !task.isCompleted));
  };

  const formatTimeSpent = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (task.status === "Development") {
      timer = setInterval(() => {
        setLocalTimeSpent((prevTime: number) => prevTime + 1);
        dispatch(updateTaskTime(task.id, localTimeSpent + 1));
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [task.status, localTimeSpent, dispatch]);

  return (
    <div ref={drag} className={`task-card ${isDragging ? "dragging" : ""}`}>
      <div className="task-info-container" onClick={(e) => e.stopPropagation()}>
        <span
          className="task-number"
          style={{ fontWeight: "bold", marginRight: "10px" }}
        >
          #{task.id}
        </span>
        <span
          className="task-created-at"
          style={{ color: "#6c757d", fontSize: "0.9em", marginRight: "10px" }}
        >
          Создана: {new Date(task.createdAt).toLocaleDateString()}
        </span>
        <span
          className="task-time-spent"
          style={{ color: "#6c757d", fontSize: "0.9em" }}
        >
          Время в работе: {formatTimeSpent(task.timeSpent)}
        </span>
      </div>
      <div className="task-header">
        <div
          className="task-title-container"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="toggle-completion-button"
            onClick={handleToggleCompletion}
            style={{
              background: task.isCompleted ? "#28a745" : "#ffc107",
              color: task.isCompleted ? "#fff" : "#000",
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
            title={
              task.isCompleted
                ? "Снять отметку выполнения"
                : "Отметить как выполненное"
            }
          >
            {task.isCompleted && "✓"}{" "}
          </button>

          <h3
            className="task-title"
            style={{
              textDecoration: task.isCompleted ? "line-through" : "none",
              color: task.isCompleted ? "#6c757d" : "#333",
              marginLeft: "10px",
              whiteSpace: "normal",
              wordBreak: "break-word",
            }}
          >
            {task.title}
          </h3>
        </div>
        <div className="task-actions">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="edit-tooltip">Редактировать задачу</Tooltip>}
          >
            <button className="edit-task-button" onClick={handleEdit}>
              <FaEdit size={16} color="#007bff" />
            </button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="attach-tooltip">Прикрепить файл</Tooltip>}
          >
            <label
              className="attach-file-button"
              htmlFor={`file-upload-${task.id}`}
            >
              <FaPaperclip size={16} color="#17a2b8" />
            </label>
          </OverlayTrigger>
          <input
            id={`file-upload-${task.id}`}
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="delete-tooltip">Удалить задачу</Tooltip>}
          >
            <button
              className="delete-task-button"
              onClick={() => handleDelete(task.id)}
            >
              <FaTrash size={16} color="#dc3545" />
            </button>
          </OverlayTrigger>
        </div>
      </div>

      <p>{task.description}</p>
      <p>Дата окончания: {task.dueDate}</p>
      <p>Приоритет: {task.priority}</p>

      {task.files.length > 0 && (
        <div className="attached-files">
          <h4>Прикреплённые файлы:</h4>
          <ul>
            {task.files.map((fileUrl: any, index: any) => (
              <li key={index} className="attached-file">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  {fileUrl.includes("image") ? (
                    <img
                      src={fileUrl}
                      alt={`Preview ${index}`}
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  ) : (
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                      {fileUrl.split("/").pop() || "Неизвестный файл"}
                    </a>
                  )}
                  <button
                    className="remove-file-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFileRemove(index);
                    }}
                    title="Удалить файл"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={handleAddComment} className="add-comment-button">
        Добавить комментарий
      </button>

      <NestedCommentsSection comments={task.comments} taskId={task.id} />
      <EditTask
        show={showEditModal}
        onHide={handleCloseEditModal}
        taskId={task.id}
      />
      <AddCommentModal
        show={showAddCommentModal}
        onHide={handleCloseAddCommentModal}
        taskId={task.id}
      />
    </div>
  );
};

export default TaskCard;
