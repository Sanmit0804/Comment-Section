import React, { useState } from "react";
import "./CommentSection.css";

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "chakalaka13",
      profilePic: "https://via.placeholder.com/40",
      text: "I think there hasn't yet been invented a way to structure comments.",
      time: "2y ago",
      replies: [],
    },
    {
      id: 2,
      user: "pvhbk",
      profilePic: "https://via.placeholder.com/40",
      text: "I find it easier to conceptualize than Twitter nesting.",
      time: "2y ago",
      replies: [],
    },
  ]);

  const [replyingTo, setReplyingTo] = useState(null);
  const [editing, setEditing] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleSendComment = (parentId = null) => {
    if (!inputValue.trim()) return;
  
    const newComment = {
      id: Date.now(),
      user: "currentUser",
      profilePic: "https://via.placeholder.com/40",
      text: parentId
        ? `@${findComment(comments, parentId)?.user || "unknown"} ${inputValue}`
        : inputValue,
      time: "just now",
      replies: [],
    };
  
    if (parentId) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === parentId
            ? { ...comment, replies: [...comment.replies, newComment] }
            : comment
        )
      );
    } else {
      setComments((prev) => [...prev, newComment]);
    }
  
    setReplyingTo(null);
    setEditing(null);
    setInputValue("");
  };
  

  const handleEditComment = (commentId) => {
    setEditing(commentId);
    const editingComment = findComment(comments, commentId);
    setInputValue(editingComment?.text || "");
  };

  const findComment = (comments, id) => {
    for (const comment of comments) {
      if (comment.id === id) return comment;
      const found = findComment(comment.replies, id);
      if (found) return found;
    }
    return null;
  };

  const renderComments = (comments, parentId = null) =>
    comments.map((comment) => (
      <div key={comment.id} className="comment">
        <img
          src={comment.profilePic}
          alt={`${comment.user}'s profile`}
          className="profile-pic"
        />
        <div className="comment-content">
          <div className="comment-header">
            <strong>{comment.user}</strong> <span>{comment.time}</span>
            {comment.user === "currentUser" && (
              <div className="dropdown dots">
                •••
                <div className="dropdown-content">
                  <button onClick={() => handleEditComment(comment.id)}>
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      setComments((prev) =>
                        prev.filter((c) => c.id !== comment.id)
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
          {editing === comment.id ? (
            <div className="input-bar">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSendComment(parentId)
                }
                autoFocus
              />
              <div className="icons">
                <button className="send-btn" onClick={() => handleSendComment()}>
                  ➤
                </button>
              </div>
            </div>
          ) : (
            <>
              <p>{comment.text}</p>
              <div className="comment-actions">
                <button onClick={() => setReplyingTo(comment.id)}>Reply</button>
              </div>
            </>
          )}
          {replyingTo === comment.id && (
            <div className="input-bar reply-bar">
              <input
                type="text"
                placeholder="Write a reply..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSendComment(comment.id)
                }
                autoFocus
              />
              <div className="icons">
                <button
                  className="send-btn"
                  onClick={() => handleSendComment(comment.id)}
                >
                  ➤
                </button>
              </div>
            </div>
          )}
          {renderComments(comment.replies, comment.id)}
        </div>
      </div>
    ));

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <div className="input-bar">
        <input
          type="text"
          placeholder="Add a comment..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendComment()}
        />
        <div className="icons">
          <button className="send-btn" onClick={() => handleSendComment()}>
            ➤
          </button>
        </div>
      </div>
      <div className="comments-list">{renderComments(comments)}</div>
    </div>
  );
};

export default CommentSection;
