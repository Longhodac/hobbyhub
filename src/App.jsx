import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import './App.css';
import Header from './components/Header';
import PostCard from './components/PostCard';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import PostDetail from './components/PostDetail';
import { supabase } from './utils/supabaseClient';

function App() {
  const [posts, setPosts] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [loading, setLoading] = useState(true);

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

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          comments (*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter and sort posts
  const filteredAndSortedPosts = posts
    .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'upvotes') {
        return b.upvotes - a.upvotes;
      }
      return new Date(b.created_at) - new Date(a.created_at);
    });

  // Create post with Supabase
  const handleCreatePost = async (newPostData) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{
          title: newPostData.title,
          content: newPostData.content,
          image: newPostData.image,
          secret_key: newPostData.secret_key
        }])
        .select();

      if (error) {
        console.error('Error creating post:', error);
        alert('Error creating post. Please try again.');
      } else {
        await fetchPosts(); // Refresh posts
        setCurrentView('home');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating post. Please try again.');
    }
  };

  // Update post with Supabase
  const handleUpdatePost = async (updatedPost) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({
          title: updatedPost.title,
          content: updatedPost.content,
          image: updatedPost.image
        })
        .eq('id', updatedPost.id);

      if (error) {
        console.error('Error updating post:', error);
        alert('Error updating post. Please try again.');
      } else {
        await fetchPosts(); // Refresh posts
        setEditingPost(null);
        setCurrentView('post');
        // Update selectedPost with new data
        const updatedPostData = posts.find(p => p.id === updatedPost.id);
        if (updatedPostData) {
          setSelectedPost({
            ...updatedPostData,
            title: updatedPost.title,
            content: updatedPost.content,
            image: updatedPost.image
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating post. Please try again.');
    }
  };

  // Delete post with Supabase
  const handleDeletePost = async (authKey) => {
    if (authKey !== selectedPost.secret_key) {
      alert('Invalid secret key!');
      return;
    }

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', selectedPost.id);

      if (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post. Please try again.');
      } else {
        await fetchPosts(); // Refresh posts
        setCurrentView('home');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting post. Please try again.');
    }
  };

  // Upvote post with Supabase
  const handleUpvote = async (postId) => {
    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      const { error } = await supabase
        .from('posts')
        .update({ upvotes: post.upvotes + 1 })
        .eq('id', postId);

      if (error) {
        console.error('Error upvoting post:', error);
      } else {
        await fetchPosts(); // Refresh posts
        // Update selectedPost if it's the one being upvoted
        if (selectedPost && selectedPost.id === postId) {
          setSelectedPost({ ...selectedPost, upvotes: selectedPost.upvotes + 1 });
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Add comment with Supabase
  const handleAddComment = async (commentText) => {
    try {
      const { error } = await supabase
        .from('comments')
        .insert([{
          post_id: selectedPost.id,
          text: commentText
        }]);

      if (error) {
        console.error('Error adding comment:', error);
        alert('Error adding comment. Please try again.');
      } else {
        await fetchPosts(); // Refresh posts to get new comment
        // Update selectedPost with new comments
        const updatedPost = posts.find(p => p.id === selectedPost.id);
        if (updatedPost) {
          setSelectedPost(updatedPost);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding comment. Please try again.');
    }
  };

  const handleSelectPost = (post) => {
    setSelectedPost(post);
    setCurrentView('post');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="app-container">
        <Header showControls={false} />
        <main className="main-content py-6">
          <div className="empty-state">
            <Camera className="empty-state-icon" />
            <h3>Loading...</h3>
            <p>Getting your photography posts ready!</p>
          </div>
        </main>
      </div>
    );
  }

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