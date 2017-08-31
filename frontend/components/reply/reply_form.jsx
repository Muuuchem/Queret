import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import ReplyFormContainer from './reply_form_container';

class ReplyForm extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
      body: "",
      comment_id: this.props.comment.id,
      author_id: this.props.currentUser.id
    };
  this.handleSubmit = this.handleSubmit.bind(this);
  }
  update(property) {
    return event => this.setState({[property]: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.newReply(this.state);
    this.state = {
      body: "",
      comment_id: "",
      author_id: ""
    };
  }


 render() {
   return(
     <form className="form-reply" onSubmit={this.handleSubmit}>
           <h1 className="new-reply">Add A Reply</h1>
           <label>
             <input
               className="reply-input"
               ref="body"
               placeholder="New Reply"
               value={this.state.body}
               onChange={this.update('body')}
               required/>
           </label>
           <button className="new-button">Submit Reply</button>
         </form>
);
  }
}


export default withRouter(ReplyForm);
