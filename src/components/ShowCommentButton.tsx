import React, { useState } from "react";
import { IComment } from "../redux/types/tasksTypes";

interface ICommentProps {
  comment: IComment;
  level: number;
  onReply: (commentId: number, text: string) => void;
  onEdit: (commentId: number, text: string) => void;
  onDelete: (commentId: number) => void;
}

export const ShowCommentButton = ({ comment, level, onReply, onEdit, onDelete }: ICommentProps) => {
  const [showReplies, setShowReplies] = useState(false);

  const handleToggleReplies = () => {
    setShowReplies((prev) => !prev);
  };

  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      {" "}
      {/* Indentation */}
      <div>
        {/* ... display comment text, edit/delete buttons, etc. */}

        {comment.replies &&
          comment.replies.length > 0 && ( // Show/hide button CONDITIONAL rendering
            <button onClick={handleToggleReplies}>
              {showReplies ? "Hide Replies" : `Show Replies (${comment.replies.length})`}
            </button>
          )}

        {/* Conditionally render replies */}
        {showReplies &&
          comment.replies.map((reply) => (
            <ShowCommentButton
              key={reply.id}
              comment={reply}
              level={level + 1}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
      </div>
    </div>
  );
};
