import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

function CommentSection({ comments, onAddComment, formatTimeAgo }) {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e) => {
    if (e) e.preventDefault();
    if (!newComment.trim()) return;
    
    onAddComment(newComment);
    setNewComment('');
  };

  return (
    <div className="comment-section">
      <h3 className="comment-section-title">
        <MessageCircle className="w-5 h-5" />
        <span>Comments ({comments?.length || 0})</span>
      </h3>

      <div className="comment-form">
        <div className="comment-input-group">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="comment-input"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddComment(e);
              }
            }}
          />
          <button onClick={handleAddComment} className="btn btn-primary">
            Comment
          </button>
        </div>
      </div>

      <div className="comments-list">
        {!comments || comments.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <p className="comment-text">{comment.text}</p>
              <span className="comment-timestamp">
                {formatTimeAgo(comment.created_at)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;