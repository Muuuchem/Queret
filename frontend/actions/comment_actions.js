import * as APIUtil from '../util/comment_api_util';

export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS';
export const RECEIVE_A_COMMENT = 'RECEIVE_A_COMMENT';
export const DELETE_A_COMMENT = 'DELETE_A_COMMENT';
export const ERROR_COMMENT = 'ERROR_COMMENT';

export const receiveAllComments = comments => ({
  type: RECEIVE_ALL_COMMENTS,
  comments,
});

export const receiveAComment = comment => ({
  type: RECEIVE_A_COMMENT,
  comment,
});

export const requestAllComments = () => (dispatch) => {
  return APIUtil.fetchAllComments()
    .then(comments => dispatch(receiveAllComments(comments)));
};

export const requestAComment = id => dispatch => {
  return APIUtil.fetchComment(id).then(comment =>
    dispatch(receiveAComment(comment)));
};

export const changeAComment = (comment) => dispatch => {
  return APIUtil.updateComment(comment)
    .then(newcomment => {
      dispatch(receiveAComment(newcomment));
      return newcomment;
    });
};

export const newComment = (comment) => dispatch => {
  return APIUtil.createComment(comment)
  .then(newcomment => {
    dispatch(receiveAComment(newcomment));
  });
};
