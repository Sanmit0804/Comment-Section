import React, { useState } from 'react';
import axios from 'axios';
import "./Comments.scss"

const CommentItem = ({ comment, fetchComments }) => {
  const [replyContent, setReplyContent] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);

  // Handle adding a reply
  const handleAddReply = async () => {
    if (!replyContent.trim()) return;
    try {
      await axios.post('/api/comments', {
        content: replyContent,
        username: 'Current User', // Replace with actual username
        parentId: comment._id,
      });
      setReplyContent('');
      setShowReplyBox(false);
      fetchComments(); // Refresh comments after adding a reply
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  return (
    <div className="comment-item">
      <div className="comment-content">
        <strong>{comment.username}</strong>
        <p>{comment.content}</p>
      </div>
      <button onClick={() => setShowReplyBox(!showReplyBox)}>Reply</button>
      {showReplyBox && (
        <div className="reply-box">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
          />
          <button onClick={handleAddReply}>Submit</button>
        </div>
      )}
      {comment.replies?.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <CommentItem key={reply._id} comment={reply} fetchComments={fetchComments} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
