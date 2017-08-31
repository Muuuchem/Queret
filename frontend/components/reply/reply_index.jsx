import React from 'react';
import { withRouter } from 'react-router';
import ReplyIndexItem from './reply_index_item';
import ReplyFormContainer from '../reply/reply_form_container';
import { Link, Route } from 'react-router-dom';

class ReplyIndex extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount (){
    this.props.requestAllReplies();
  }

  replies() {
    if (this.props.replies.length > 0) {
    return this.props.replies.filter( (reply) => {
        return reply.comment_id === this.props.comment.id;
    });
    } else {
      return [];
    }
  }


  render() {
    const replies = this.replies().map(reply => (
        <ReplyIndexItem key={reply.id} reply={reply} />


    ));
    return (
      <div>
        <br/>
        <ul>{replies}</ul>
      </div>

    );
  }
}

export default withRouter(ReplyIndex);
