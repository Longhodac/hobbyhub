import React, { useState } from 'react';
import Header from './Header';

function CreatePost({ onSubmit, onCancel }) {
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    image: '',
    secret_key: ''
  });

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!newPost.title.trim() || !newPost.secret_key.trim()) return;
    
    onSubmit(newPost);
    setNewPost({ title: '', content: '', image: '', secret_key: '' });
  };

  return (
    <div className="app-container">
      <Header showControls={false} />
      
      <div className="page-header">
        <div className="page-header-content">
          <a href="#" onClick={onCancel} className="back-link">← Back</a>
          <h1>Create New Post</h1>
        </div>
      </div>

      <main className="container-sm py-6">
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="form-input"
            placeholder="What's your post about?"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className="form-textarea"
            placeholder="Share your thoughts, tips, or story..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Image URL</label>
          <input
            type="url"
            value={newPost.image}
            onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
            className="form-input"
            placeholder="https://example.com/your-photo.jpg"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Secret Key *</label>
          <input
            type="text"
            value={newPost.secret_key}
            onChange={(e) => setNewPost({ ...newPost, secret_key: e.target.value })}
            className="form-input"
            placeholder="Choose a secret key to edit/delete this post later"
            required
          />
        </div>

        <div className="form-actions">
          <button onClick={handleSubmit} className="btn btn-primary btn-large btn-full">
            Create Post
          </button>
          <button onClick={onCancel} className="btn btn-secondary btn-large">
            Cancel
          </button>
        </div>
      </main>
    </div>
  );
}

export default CreatePost;