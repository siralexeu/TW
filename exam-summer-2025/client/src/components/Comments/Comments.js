import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import AppContext from '../../state/AppContext';
import './Comments.css';

const Comments = () => {
  // Dacă navighezi cu state, folosește useLocation
  const location = useLocation();
  // Aștepți ca postId să fie transmis prin state în loc de parametri din URL
  const { postId } = location.state || {}; // Obține postId din state (sau undefined)

  const globalState = useContext(AppContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (postId) { 
      // Dacă avem postId, preia comentariile specifice postării
      globalState.comments.getComments(globalState, postId);
      const commentsSuccessListener = globalState.comments.emitter.addListener(
        'COMMENTS_FETCH_SUCCESS',
        () => {
          setComments(globalState.comments.comments);
        }
      );
      return () => {
        commentsSuccessListener.remove();
      };
    } else {
      // Dacă nu avem postId, poți seta un mesaj sau o altă acțiune
      setComments([]);
    }
  }, [postId, globalState.comments]);

  const handleAddComment = () => {
    if (postId && newComment.trim()) {
      globalState.comments.addComment(globalState, postId, newComment);
      setNewComment('');
    }
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      globalState.comments.deleteComment(globalState, commentId);
    }
  };

  return (
    <div className="comments-container">
      <div className="page-title">
        <h2>Comments</h2>
        <p>Join the conversation!</p>
      </div>
      { postId ? (
        <>
          <div className="add-comment-section">
            <textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
          <div className="comments-list">
            {comments.length === 0 ? (
              <p>No comments to display</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <p>{comment.content}</p>
                  <span>By {comment.user.username}</span>
                  <button onClick={() => handleDeleteComment(comment.id)}>
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <p>No post selected for comments.</p>
      )}
    </div>
  );
};

export default Comments