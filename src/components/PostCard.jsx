import React from 'react';
import { Clock, ArrowUp, MessageCircle } from 'lucide-react';

function PostCard({ post, onClick, formatTimeAgo }) {
  return (
    <article onClick={() => onClick(post)} className="post-card">
      <div className="post-card-header">
        <h2 className="post-card-title">{post.title}</h2>
        <div className="post-meta">
          <span className="meta-item">
            <Clock className="w-4 h-4" />
            <span>{formatTimeAgo(post.created_at)}</span>
          </span>
          <span className="meta-item">
            <ArrowUp className="w-4 h-4" />
            <span>{post.upvotes}</span>
          </span>
          <span className="meta-item">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments?.length || 0}</span>
          </span>
        </div>
      </div>
    </article>
  );
}

export default PostCard;