import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentItem from './CommentItem';
import "./Comments.scss"

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Fetch comments from the backend
  const fetchComments = async () => {
    try {
      const response = await axios.get('/api/comments');
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await axios.post('/api/comments', {
        content: newComment,
        username: 'Current User', // Replace with actual username
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      <div className="add-comment">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} fetchComments={fetchComments} />
      ))}
    </div>
  );
};

export default CommentList;
