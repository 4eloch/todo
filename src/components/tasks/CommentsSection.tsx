import React from "react";
import { Comment } from "../../redux/types/tasksTypes";

interface CommentsSectionProps {
  comments: Comment[];
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments }) => {
  const renderComments = (comments: Comment[], depth = 0) => {
    return comments.map((comment) => (
      <div key={comment.id} style={{ marginLeft: `${depth * 20}px` }}>
        <p>{comment.text}</p>
        {renderComments(comment.replies, depth + 1)}
      </div>
    ));
  };

  return (
    <div className="comments-section">
      <h4>Комментарии</h4>
      {renderComments(comments)}
    </div>
  );
};

export default CommentsSection;
