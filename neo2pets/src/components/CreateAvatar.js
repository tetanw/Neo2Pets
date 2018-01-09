import React, {Component} from 'react';

class CreateAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
    <div className="jumbotron jumbotron-style">
      <h1> Name your avatar!</h1>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {/*}<img src={Neopet1} className="img-responsive"/>
      <img src={Neopet2} className="img-responsive"/>
      <img src={Neopet3} className="img-responsive"/>
      <img src={Neopet4} className="img-responsive"/>
      <img src={Neopet5} className="img-responsive"/>
      <img src={Neopet6} className="img-responsive"/>
      <img src={Neopet7} className="img-responsive"/>
      <img src={Neopet8} className="img-responsive"/>*/}
    </div>
    );
  }
}

{/*class CreateAvatar extends React.Component {
  render() {
    return (
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}*/}



export default CreateAvatar
{/*export default NameForm*/}
