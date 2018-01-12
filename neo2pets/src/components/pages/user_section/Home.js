import React, {Component} from 'react';

class Home extends Component {
  render() {
    return (
      <div className="jumbotron jumbotron-style">
        <h1>Home</h1>
        <p>{this.props.token}</p>

      </div>
    );
  }
}

export default Home;