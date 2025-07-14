import EventEmitter from '../../utils/EventEmitter';
import { SERVER } from '../../config/global';

class CommentStore {
  constructor() {
    this.comments = [];
    this.emitter = new EventEmitter();
  }

  async getComments(state, postId) {
    try {
      const response = await fetch(`${SERVER}/api/posts/${postId}/comments`, {
        headers: {
          Authorization: `Bearer ${state.currentUser.data.token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      console.log('Comments fetched:', data);
      this.comments = data;
      this.emitter.emit('COMMENTS_FETCH_SUCCESS');
    } catch (err) {
      console.error('Error fetching comments:', err);
      this.emitter.emit('COMMENTS_FETCH_ERROR', err);
    }
  }

  async addComment(state, postId, content) {
    try {
      const response = await fetch(`${SERVER}/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state.currentUser.data.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
      });
      if (!response.ok) {
        throw response;
      }
      this.getComments(state, postId); // Reîncarcă lista de comentarii după adăugare
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  }

  async deleteComment(state, commentId) {
    try {
      const response = await fetch(`${SERVER}/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${state.currentUser.data.token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw response;
      }
      this.emitter.emit('COMMENT_DELETED_SUCCESS');
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  }
}

export default CommentStore;