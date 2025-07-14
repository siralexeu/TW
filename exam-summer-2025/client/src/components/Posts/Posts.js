import React, { useState, useEffect, useContext } from 'react';
import './Posts.css';
import PostCardList from '../PostCardList/PostCardList';
import AppContext from '../../state/AppContext';
import Paginator from '../Paginator/Paginator';

const Posts = () => {
  const globalState = useContext(AppContext);

  const [postData, setPostData] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdAt'); // Poți schimba la 'content' pentru testare
  const [sortOrder, setSortOrder] = useState('DESC');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const postsSuccessListener = globalState.posts.emitter.addListener(
      'POSTS_SEARCH_SUCCESS',
      () => {
        setPostData(globalState.posts.posts);
        setTotalCount(globalState.posts.totalCount);
      }
    );

    const createSuccessListener = globalState.posts.emitter.addListener(
      'POST_CREATE_SUCCESS',
      () => {
        globalState.posts.getPosts(globalState, { page: currentPage, pageSize, sortBy, sortOrder, filter });
        setNewPostContent('');
      }
    );

    const deleteSuccessListener = globalState.posts.emitter.addListener(
      'POST_DELETE_SUCCESS',
      () => {
        globalState.posts.getPosts(globalState, { page: currentPage, pageSize, sortBy, sortOrder, filter });
      }
    );

    globalState.posts.getPosts(globalState, { page: currentPage, pageSize, sortBy, sortOrder, filter });

    return () => {
      postsSuccessListener.remove();
      createSuccessListener.remove();
      deleteSuccessListener.remove();
      globalState.posts.clearPosts();
    };
  }, [currentPage, pageSize, sortBy, sortOrder, filter, globalState.posts]);

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      globalState.posts.createPost(globalState, newPostContent);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
  };

  return (
    <div className="posts-container">
      <div className="page-title">
        <h2>Posts</h2>
        <p>organize your posts</p>
      </div>

      <div className="create-post-section">
        <textarea
          placeholder="What's on your mind?"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          className="post-textarea"
        />
        <button className="post-button" onClick={handleCreatePost} disabled={!newPostContent.trim()}>
          Post!
        </button>
      </div>

      <div className="filter-sort-controls">
        <input
          type="text"
          placeholder="Filter by content"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
        <div className="sort-controls">
          <label>
            Sort by:
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="createdAt">Date</option>
              <option value="content">Content Length</option>
            </select>
          </label>
          <label>
            Order:
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </label>
        </div>
      </div>

      <PostCardList data={postData} shouldDisplayDelete={true} />

      <Paginator onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} totalRecords={totalCount} />
    </div>
  );
};

export default Posts