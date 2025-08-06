import React from 'react';
import { Search, Plus, Camera } from 'lucide-react';

function Header({ 
  searchTerm, 
  setSearchTerm, 
  sortBy, 
  setSortBy, 
  onCreatePost, 
  showControls = true 
}) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-top">
          <div className="logo">
            <Camera className="w-8 h-8" />
            <h1>PhotoGeeks</h1>
          </div>
          {showControls && (
            <button onClick={onCreatePost} className="btn btn-primary">
              <Plus className="w-4 h-4" />
              <span>New Post</span>
            </button>
          )}
        </div>

        {showControls && (
          <div className="header-controls">
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="created_at">Latest</option>
                <option value="upvotes">Popular</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;