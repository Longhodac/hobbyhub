import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import './App.css';
import Header from './components/Header';
import PostCard from './components/PostCard';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import PostDetail from './components/PostDetail';
import { initialPosts } from './data/mockData';
// import { supabase } from './utils/supabaseClient'; // Uncomment when ready to use Supabase

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [currentView, setCurrentView] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created_at');

  // Utility function to format time
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  // Filter and sort posts
  const filteredAndSortedPosts = posts
    .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'upvotes') {
        return b.upvotes - a.upvotes;
      }
      return new Date(b.created_at) - new Date(a.created_at);
    });

  // Post operations
  const handleCreatePost = (newPostData) => {
    const post = {
      id: posts.length + 1,
      ...newPostData,
      upvotes: 0,
      comments: [],
      created_at: new Date()
    };

    setPosts([post, ...posts]);
    setCurrentView('home');
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts(posts.map(post => 
      post.id === updatedPost.id 
        ? { ...post, title: updatedPost.title, content: updatedPost.content, image: updatedPost.image }
        : post
    ));
    setEditingPost(null);
    setCurrentView('post');
  };

  const handleDeletePost = (authKey) => {
    if (authKey !== selectedPost.secret_key) {
      alert('Invalid secret key!');
      return;
    }

    setPosts(posts.filter(post => post.id !== selectedPost.id));
    setCurrentView('home');
  };

  const handleUpvote = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
    ));
    // Update selectedPost if it's the one being upvoted
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost({ ...selectedPost, upvotes: selectedPost.upvotes + 1 });
    }
  };

  const handleAddComment = (commentText) => {
    const comment = {
      id: Date.now(),
      text: commentText,
      created_at: new Date()
    };

    setPosts(posts.map(post => 
      post.id === selectedPost.id 
        ? { ...post, comments: [...(post.comments || []), comment] }
        : post
    ));

    // Update selectedPost to reflect new comment
    setSelectedPost({ 
      ...selectedPost, 
      comments: [...(selectedPost.comments || []), comment] 
    });
  };

  const handleSelectPost = (post) => {
    setSelectedPost(post);
    setCurrentView('post');
  };

  // Home View
  if (currentView === 'home') {
    return (
      <div className="app-container">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onCreatePost={() => setCurrentView('create')}
        />

        <main className="main-content py-6">
          {filteredAndSortedPosts.length === 0 ? (
            <div className="empty-state">
              <Camera className="empty-state-icon" />
              <h3>No posts found</h3>
              <p>Start sharing your photography!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredAndSortedPosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onClick={handleSelectPost}
                  formatTimeAgo={formatTimeAgo}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    );
  }

  // Create Post View
  if (currentView === 'create') {
    return (
      <CreatePost
        onSubmit={handleCreatePost}
        onCancel={() => setCurrentView('home')}
      />
    );
  }

  // Edit Post View
  if (currentView === 'edit' && editingPost) {
    return (
      <EditPost
        post={editingPost}
        onSubmit={handleUpdatePost}
        onCancel={() => {
          setCurrentView('post');
          setEditingPost(null);
        }}
      />
    );
  }

  // Post Detail View
  if (currentView === 'post' && selectedPost) {
    return (
      <PostDetail
        post={selectedPost}
        onBack={() => setCurrentView('home')}
        onEdit={() => {
          setEditingPost(selectedPost);
          setCurrentView('edit');
        }}
        onDelete={handleDeletePost}
        onUpvote={handleUpvote}
        onAddComment={handleAddComment}
        formatTimeAgo={formatTimeAgo}
      />
    );
  }

  return null;
}

export default App;