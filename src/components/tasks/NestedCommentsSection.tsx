import React, { useState } from "react";
import AddCommentModal from "../modals/AddCommentModal";
import { useDispatch } from "react-redux";
import { addComment } from "../../redux/actions/tasksActions";
import { Comment } from "../../redux/types/tasksTypes";
import { TasksActionTypes } from "../../redux/types/tasksTypes";
import { Dispatch } from "redux";
import "../../styles/taskStyles.scss";

interface NestedCommentsProps {
  comments: Comment[];
  taskId: number;
}

const NestedCommentsSection: React.FC<NestedCommentsProps> = ({
  comments,
  taskId,
}) => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>();

  // Состояние для отслеживания разворачиваемых комментариев
  const [expandedComments, setExpandedComments] = useState<number[]>([]);

  // Состояние для модального окна ответа
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
  const renderComments = (comments: Comment[], depth = 0) => {
    return comments.map((comment) => (
      <div key={comment.id} style={{ marginLeft: `${depth * 20}px` }}>
        <div className="comment">
          <p>{comment.text}</p>
          {/* Кнопка для добавления ответа */}
          <button onClick={() => handleReply(comment.id)}>Ответить</button>

          {/* Кнопка для показа/скрытия ответов */}
          {comment.replies.length > 0 && (
            <button
              onClick={() => toggleExpand(comment.id)}
              className="toggle-replies-button"
              data-expanded={expandedComments.includes(comment.id)}
            >
              {expandedComments.includes(comment.id)
                ? "Скрыть ответы"
                : "Показать ответы"}
            </button>
          )}
        </div>

        {/* Рекурсивное отображение ответов, если они развернуты */}
        {expandedComments.includes(comment.id) &&
          renderComments(comment.replies, depth + 1)}
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
