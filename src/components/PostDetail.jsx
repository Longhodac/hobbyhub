import React from 'react';
import { Edit, Trash2, Clock, ArrowUp } from 'lucide-react';
import Header from './Header';
import CommentSection from './CommentSection';

function PostDetail({ 
  post, 
  onBack, 
  onEdit, 
  onDelete, 
  onUpvote, 
  onAddComment, 
  formatTimeAgo 
}) {
  const handleDelete = () => {
    const key = prompt('Enter secret key to delete this post:');
    if (key) {
      onDelete(key);
    }
  };

  return (
    <div className="app-container">
      <Header showControls={false} />
      
      <div className="page-header">
        <div className="page-header-content">
          <a href="#" onClick={onBack} className="back-link">← Back to Feed</a>
        </div>
      </div>

      <main className="main-content py-6">
        <article className="post-detail">
          <div className="post-detail-header">
            <div className="post-detail-title-row">
              <h1 className="post-detail-title">{post.title}</h1>
              <div className="post-actions">
                <button onClick={onEdit} className="btn-ghost" title="Edit post">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={handleDelete} className="btn-ghost btn-danger" title="Delete post">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="post-detail-meta">
              <span className="meta-item">
                <Clock className="w-4 h-4" />
                <span>{formatTimeAgo(post.created_at)}</span>
              </span>
              <button onClick={() => onUpvote(post.id)} className="upvote-btn">
                <ArrowUp className="w-4 h-4" />
                <span>{post.upvotes}</span>
              </button>
            </div>

            {post.content && (
              <div className="post-content">
                <p>{post.content}</p>
              </div>
            )}

            {post.image && (
              <div className="post-image">
                <img src={post.image} alt="Post image" />
              </div>
            )}
          </div>

          <CommentSection
            comments={post.comments}
            onAddComment={onAddComment}
            formatTimeAgo={formatTimeAgo}
          />
        </article>
      </main>
    </div>
  );
}

export default PostDetail;