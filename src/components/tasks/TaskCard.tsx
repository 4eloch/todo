import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import EditTaskModal from "../modals/EditTaskModal";
import AddCommentModal from "../modals/AddCommentModal";
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

interface TaskCardProps {
  task: ITask;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>();

  // Настройка drag-and-drop
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

  // Состояние для списка прикреплённых файлов
  const [files, setFiles] = React.useState<File[]>(
    task.files.map((file: any) => new File([], file))
  );

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

  // Функция для обработки выбора файлов
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      const updatedTask: ITask = {
        ...task,
        files: [...task.files, ...newFiles], // Добавляем новые файлы к существующим
      };
      dispatch({ type: "EDIT_TASK", payload: updatedTask }); // Обновляем задачу в Redux
    }
  };

  // Функция для удаления файла
  const handleFileRemove = (index: number) => {
    const updatedTask: ITask = {
      ...task,
      files: task.files.filter((_: any, i: any) => i !== index), // Удаляем файл по индексу
    };
    dispatch({ type: "EDIT_TASK", payload: updatedTask }); // Обновляем задачу в Redux
  };

  // Функция для отметки задачи как выполненной или нет
  const handleToggleCompletion = () => {
    dispatch(toggleTaskCompletion(task.id, !task.isCompleted)); // Переключаем состояние выполнения
  };

  // Форматирование времени в HH:MM:SS
  const formatTimeSpent = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Таймер для задачи в статусе Development
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (task.status === "Development") {
      // Запускаем таймер, если задача в статусе Development
      timer = setInterval(() => {
        setLocalTimeSpent((prevTime: number) => prevTime + 1); // Увеличиваем время на 1 секунду
        dispatch(updateTaskTime(task.id, localTimeSpent + 1)); // Обновляем время в Redux
      }, 1000);
    }

    // Очищаем таймер при изменении статуса или выходе из компонента
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [task.status, localTimeSpent, dispatch]);

  return (
    <div ref={drag} className={`task-card ${isDragging ? "dragging" : ""}`}>
      {/* Блок с номером задачи, датой создания и временем в работе */}
      <div className="task-info-container" onClick={(e) => e.stopPropagation()}>
        {/* Номер задачи */}
        <span
          className="task-number"
          style={{ fontWeight: "bold", marginRight: "10px" }}
        >
          #{task.id}
        </span>

        {/* Дата создания */}
        <span
          className="task-created-at"
          style={{ color: "#6c757d", fontSize: "0.9em", marginRight: "10px" }}
        >
          Создана: {new Date(task.createdAt).toLocaleDateString()}
        </span>

        {/* Время в работе */}
        <span
          className="task-time-spent"
          style={{ color: "#6c757d", fontSize: "0.9em" }}
        >
          Время в работе: {formatTimeSpent(task.timeSpent)}
        </span>
      </div>
      {/* Верхняя часть карточки */}
      <div className="task-header">
        {/* Блок с чекбоксом выполнения и названием задачи */}
        <div
          className="task-title-container"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Кнопка отметки задачи как выполненной */}
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
            {/* Отображаем галочку, если задача выполнена */}
          </button>

          {/* Название задачи рядом с чекбоксом */}
          <h3
            className="task-title"
            style={{
              textDecoration: task.isCompleted ? "line-through" : "none",
              color: task.isCompleted ? "#6c757d" : "#333",
              marginLeft: "10px", // Отступ от чекбокса
              whiteSpace: "normal", // Разрешаем перенос текста
              wordBreak: "break-word", // Перенос слов
            }}
          >
            {task.title}
          </h3>
        </div>
        <div className="task-actions">
          {/* Кнопка редактирования (карандаш) с tooltip */}
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="edit-tooltip">Редактировать задачу</Tooltip>}
          >
            <button className="edit-task-button" onClick={handleEdit}>
              <FaEdit size={16} color="#007bff" />
            </button>
          </OverlayTrigger>

          {/* Кнопка прикрепления файла (скрепка) с tooltip */}
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

          {/* Кнопка удаления (мусорное ведро) с tooltip */}
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

      {/* Основная информация о задаче */}
      <p>{task.description}</p>
      <p>Дата окончания: {task.dueDate}</p>
      <p>Приоритет: {task.priority}</p>

      {/* Отображение прикреплённых файлов */}
      {task.files.length > 0 && (
        <div className="attached-files">
          <h4>Прикреплённые файлы:</h4>
          <ul>
            {task.files.map((fileUrl: any, index: any) => (
              <li key={index} className="attached-file">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  {/* Отображение файла */}
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

                  {/* Кнопка удаления файла (крестик) */}
                  <button
                    className="remove-file-button"
                    onClick={(e) => {
                      e.stopPropagation(); // Предотвращаем клик на родительский элемент
                      handleFileRemove(index); // Удаляем файл
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

      {/* Кнопка добавления комментария */}
      <button onClick={handleAddComment} className="add-comment-button">
        Добавить комментарий
      </button>

      {/* Секция комментариев */}
      <NestedCommentsSection comments={task.comments} taskId={task.id} />

      {/* Модальные окна */}
      <EditTaskModal
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
