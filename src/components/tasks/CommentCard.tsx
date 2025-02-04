import React, { useState } from "react";
import { useDispatch } from "react-redux";
import EditCommentModal from "../modals/EditCommentModal";
import { deleteComment } from "../../redux/actions";
import { TasksActionTypes, IComment } from "../../redux/types/tasksTypes";
import { Dispatch } from "redux";

interface CommentCardProps {
  comment: IComment;
  taskId: number;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, taskId }) => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>();
  const [showEditModal, setShowEditModal] = useState(false);

  // Функция для открытия модального окна редактирования
  const handleEdit = () => {
    setShowEditModal(true);
  };

  // Функция для закрытия модального окна редактирования
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  // Функция для удаления комментария
  const handleDeleteComment = () => {
    if (window.confirm("Вы уверены, что хотите удалить этот комментарий?")) {
      dispatch(deleteComment(taskId, comment.id)); // Отправляем экшен удаления комментария
    }
  };

  return (
    <div className="comment-card">
      {/* Текст комментария */}
      <p>{comment.isDeleted ? "Комментарий был удалён" : comment.text}</p>

      {/* Блок действий с комментарием */}
      {!comment.isDeleted && (
        <div
          className="comment-actions"
          style={{ display: "flex", gap: "10px", marginTop: "5px" }}
        >
          {/* Кнопка редактирования (текст "редактировать") */}
          <span
            className="edit-comment-button"
            onClick={handleEdit}
            style={{
              color: "#007bff",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "0.9em",
            }}
          >
            редактировать
          </span>

          {/* Кнопка удаления (текст "удалить") */}
          <span
            className="delete-comment-button"
            onClick={handleDeleteComment}
            style={{
              color: "#dc3545",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "0.9em",
            }}
          >
            удалить
          </span>
        </div>
      )}

      {/* Модальное окно для редактирования комментария */}
      <EditCommentModal
        show={showEditModal}
        onHide={handleCloseEditModal}
        taskId={taskId}
        commentId={comment.id}
      />
    </div>
  );
};

export default CommentCard;
