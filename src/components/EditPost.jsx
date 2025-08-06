import React, { useState } from 'react';
import Header from './Header';

function EditPost({ post, onSubmit, onCancel }) {
  const [editingPost, setEditingPost] = useState({
    id: post.id,
    title: post.title,
    content: post.content || '',
    image: post.image || '',
    secret_key: post.secret_key
  });
  const [authKey, setAuthKey] = useState('');

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (authKey !== post.secret_key) {
      alert('Invalid secret key!');
      return;
    }

    onSubmit(editingPost);
    setAuthKey('');
  };

  return (
    <div className="app-container">
      <Header showControls={false} />
      
      <div className="page-header">
        <div className="page-header-content">
          <a href="#" onClick={onCancel} className="back-link">← Back</a>
          <h1>Edit Post</h1>
        </div>
      </div>

      <main className="container-sm py-6">
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input
            type="text"
            value={editingPost.title}
            onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea
            value={editingPost.content}
            onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Image URL</label>
          <input
            type="url"
            value={editingPost.image}
            onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Enter Secret Key *</label>
          <input
            type="text"
            value={authKey}
            onChange={(e) => setAuthKey(e.target.value)}
            className="form-input"
            placeholder="Enter the secret key for this post"
            required
          />
        </div>

        <div className="form-actions">
          <button onClick={handleSubmit} className="btn btn-primary btn-large btn-full">
            Update Post
          </button>
          <button onClick={onCancel} className="btn btn-secondary btn-large">
            Cancel
          </button>
        </div>
      </main>
    </div>
  );
}

export default EditPost;