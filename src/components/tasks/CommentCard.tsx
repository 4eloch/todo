import { useState } from "react";
import { useDispatch } from "react-redux";
import EditComment from "../modals/EditComment";
import { deleteComment } from "../../redux/actions";
import { TasksActionTypes, IComment } from "../../redux/types/tasksTypes";
import { Dispatch } from "redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface ICommentCardProps {
  comment: IComment;
  taskId: number;
  onReply: (commentId: number) => void;
  onToggleExpand: (commentId: number) => void;
  isExpanded: boolean;
}

const CommentCard = ({
  comment,
  taskId,
  onReply,
  onToggleExpand,
  isExpanded,
}: ICommentCardProps) => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>();
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleDeleteComment = () => {
    if (window.confirm("Вы уверены, что хотите удалить этот комментарий?")) {
      dispatch(deleteComment(taskId, comment.id));
    }
  };

  return (
    <div className="comment-card">
      <p>{comment.isDeleted ? "Комментарий был удалён" : comment.text}</p>

      {!comment.isDeleted && (
        <div className="comment-actions" style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
          <span
            className="reply-comment-button"
            onClick={() => onReply(comment.id)}
            style={{
              color: "#28a745",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "0.9em",
            }}
          >
            Ответить
          </span>
          <span
            className="edit-comment-button"
            onClick={handleEdit}
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "0.9em",
            }}
          >
            Редактировать
          </span>
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
            Удалить
          </span>
        </div>
      )}
      <div>
        {comment.replies.length > 0 && (
          <OverlayTrigger
            placement="left"
            overlay={
              <Tooltip id="toggle-replies-tooltip">
                {isExpanded ? "Скрыть ответы" : "Показать ответы"}
              </Tooltip>
            }
          >
            <span
              className="toggle-replies-button"
              onClick={() => onToggleExpand(comment.id)}
              style={{
                border: "1px solid black",
                padding: "0 10px",
                verticalAlign: "middle",
                height: "12px",
                width: "12px",
                borderRadius: "2px",
                color: isExpanded ? "#dc3545" : "#28a745",
                cursor: "pointer",
                fontSize: "0.9em",
              }}
            >
              {isExpanded ? "-" : "+"}
            </span>
          </OverlayTrigger>
        )}
      </div>

      <EditComment
        show={showEditModal}
        onHide={handleCloseEditModal}
        taskId={taskId}
        commentId={comment.id}
      />
    </div>
  );
};

export default CommentCard;
