import React, { useState } from "react";
import AddCommentModal from "../modals/AddCommentModal";
import CommentCard from "./CommentCard";
import { useDispatch } from "react-redux";
import { TasksActionTypes, IComment } from "../../redux/types/tasksTypes";
import { Dispatch } from "redux";
import "../../styles/taskStyles.scss";

interface NestedCommentsProps {
  comments: IComment[];
  taskId: number;
}

const NestedCommentsSection: React.FC<NestedCommentsProps> = ({
  comments,
  taskId,
}) => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>();

  // Состояние для отслеживания разворачиваемых комментариев
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [showReplyModal, setShowReplyModal] = React.useState(false);
  const [parentId, setParentId] = React.useState<number | undefined>(undefined);

  // Функция для обработки клика на "Ответить"
  const handleReply = (commentId: number) => {
    setParentId(commentId); // Устанавливаем ID родительского комментария
    setShowReplyModal(true); // Показываем модальное окно
  };

  // Функция для закрытия модального окна ответа
  const handleCloseReplyModal = () => {
    setShowReplyModal(false);
    setParentId(undefined); // Сбрасываем ID родительского комментария
  };

  // Функция для переключения состояния "развёрнут/свёрнут" для комментария
  const toggleExpand = (commentId: number) => {
    setExpandedComments(
      (prev) =>
        prev.includes(commentId)
          ? prev.filter((id) => id !== commentId) // Скрываем
          : [...prev, commentId] // Разворачиваем
    );
  };

  // Рекурсивное отображение комментариев
  const renderComments = (comments: IComment[], depth = 0) => {
    const styled = { marginLeft: `${depth === 0 ? 0 : depth + 20}px` };

    return comments.map((comment) => (
      <div key={comment.id} style={styled}>
        <CommentCard comment={comment} taskId={taskId} />

        {/* Кнопка для добавления ответа */}
        {!comment.isDeleted && (
          <button
            className="reply-comment-button"
            onClick={() => handleReply(comment.id)}
            style={{
              marginLeft: `${depth * 20}px`,
              marginTop: "5px",
              padding: "5px 10px",
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
          >
            Ответить
          </button>
        )}

        {/* Рекурсивное отображение ответов, если они развернуты */}
        {renderComments(comment.replies, depth + 1)}
      </div>
    ));
  };

  return (
    <div>
      {/* Список комментариев */}
      {renderComments(comments)}

      {/* Модальное окно для добавления комментария или ответа */}
      <AddCommentModal
        show={showReplyModal}
        onHide={handleCloseReplyModal}
        taskId={taskId}
        parentId={parentId} // Передаём ID родительского комментария (если есть)
      />
    </div>
  );
};

export default NestedCommentsSection;
