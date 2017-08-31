import { connect } from 'react-redux';
import { selectAllReplies } from '../../reducers/selectors';
import { requestAllReplies, requestAReply, newReply } from '../../actions/reply_actions';
import ReplyIndex from './reply_index';


const mapStateToProps = (state, OwnProps) => {
  return {
    replies: selectAllReplies(OwnProps.comment),
    comment: OwnProps.comment,
    errors: state.errors

  };
};

const mapDispatchToProps = dispatch => ({
  requestAllReplies: () => dispatch(requestAllReplies()),
  requestAReply: (id) => dispatch(requestAReply(id)),
  newReply: (reply) => dispatch(newReply(reply)),
});

const ReplyIndexContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReplyIndex);

export default ReplyIndexContainer;
