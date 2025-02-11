import React, { useState } from "react";
import { AddComment } from "../modals";
import { CommentCard } from "./CommentCard";
import { useDispatch, useSelector } from "react-redux";
import { IComment, TasksActionTypes } from "../../redux/types/tasksTypes";
import { Dispatch } from "redux";
import "../../styles/taskStyles.scss";

interface INestedCommentsProps {
  comments: IComment[];
  taskId: number;
  projectId: number;
}

export const NestedCommentsSection = ({ comments, taskId, projectId }: INestedCommentsProps) => {
  const dispatch = useDispatch<Dispatch<TasksActionTypes>>();
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [showReplyModal, setShowReplyModal] = React.useState(false);
  const [parentId, setParentId] = React.useState<number | undefined>(undefined);

  const handleReply = (commentId: number) => {
    setParentId(commentId);
    setShowReplyModal(true);
  };

  const handleCloseReplyModal = () => {
    setShowReplyModal(false);
    setParentId(undefined);
  };

  const toggleExpand = (commentId: number) => {
    setExpandedComments((prev) =>
      prev.includes(commentId) ? prev.filter((id) => id !== commentId) : [...prev, commentId]
    );
  };

  const renderComments = (comments: IComment[], depth = 0) => {
    return comments.map((comment) => (
      <div key={comment.id} style={{ marginLeft: `${depth === 0 ? 0 : depth + 20}px` }}>
        <CommentCard
          comment={comment}
          taskId={taskId}
          projectId={projectId}
          onReply={handleReply}
          onToggleExpand={toggleExpand}
          isExpanded={expandedComments.includes(comment.id)}
        />

        {expandedComments.includes(comment.id) && renderComments(comment.replies, depth + 1)}
      </div>
    ));
  };

  return (
    <div>
      {renderComments(comments)}

      <AddComment
        isShown={showReplyModal}
        onHide={handleCloseReplyModal}
        taskId={taskId}
        projectId={projectId}
        parentId={parentId}
      />
    </div>
  );
};
