import React from 'react';
import { Link } from 'react-router-dom';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.render = this.render.bind(this);
    this.myFunction = this.myFunction.bind(this);
  }

  componentDidMount() {
      this.setState(this.props.requestAllQuestions());
    }

  handleSubmit(e) {
    e.preventDefault;
    this.state = {
      searchParams: ""
    };
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value });
  }

  hits() {
    let results = [];

    const { questions } = this.props;
    // console.log(questions);
    if (this.state.searchParams) {
      questions.forEach( question => {
        if (question.title.toLowerCase().includes(this.state.searchParams.toLowerCase())) {
          results.push(question);
        }
      });
    }

    if (results) {
      let mappedResults = results.slice(0,10).map((question, idx) => {
        return ( <li onClick={() => {
          this.setState({searchParams: ""});
        }} className="search-results" key={idx}>
        <Link to={`/api/questions/${question.id}`} onClick={this.handleSubmit}> { question.title }</Link>
      </li>);
    });
    return mappedResults;
  } else {
    return false;
  }
  }

  parseResults(){
    if (this.hits().length === 0) {
      return (
        <div></div>
      );
    } else {
      return (
        <div className="results">
          <ul>{this.hits()}</ul>
        </div>
      );
    }
  }
  myFunction(e) {
    e.preventDefault;
    alert('please select a link');
  }


  render(){
      return (
        <div className="search-container">
          <div className="outer">
            <div className="search-bar">
              <form>
              <input type="text" placeholder="Search All Questions" className="search-form"
                onChange={this.update('searchParams')} onSubmit={this.myFunction} value={this.searchParams}></input>
            </form>
            </div>
          </div>
          <div>
            {this.parseResults()}
          </div>
        </div>
      );
  }
}
export default SearchForm;
