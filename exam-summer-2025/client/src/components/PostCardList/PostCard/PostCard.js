import React, { useContext } from 'react';
import './PostCard.css';
import AppContext from '../../../state/AppContext';
import { AVATAR_URL } from '../../../config/global';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ item, shouldDisplayDelete = false }) => {
  const globalState = useContext(AppContext);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      globalState.posts.deletePost(globalState, item.id);
    }
  };

  const handleViewComments = () => {
    // Navighează la ruta "/comments" și transmite postId prin state
    navigate('/comments', { state: { postId: item.id } });
  };

  return (
    <div className="post-card">
      <div className="post-avatar-container">
        <img src={AVATAR_URL} alt="Avatar" className="post-avatar-image" />
        <p className="post-username">{item.user.username}</p>
      </div>
      <div className="post-content-container">
        <div className="post-content">
          <p>{item.content}</p>
        </div>
        <span className="post-date">{formatDate(item.createdAt)}</span>
        {shouldDisplayDelete && (
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        )}
        <button className="view-comments-button" onClick={handleViewComments}>
          View Comments
        </button>
      </div>
    </div>
  );
};

export default PostCard