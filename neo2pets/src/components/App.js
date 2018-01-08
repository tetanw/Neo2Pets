import React, {Component} from 'react';
import Header from './Header';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <div className="main" name="">
        <Header/>
        <Main/>
      </div>
    )
  }
}

export default App;
