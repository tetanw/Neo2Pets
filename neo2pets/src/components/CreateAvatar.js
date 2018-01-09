import React, {Component} from 'react';
import ImagePicker from 'react-image-picker';
import Neopet1 from '../assets/images/neopets/Neopet1.png';
import Neopet2 from '../assets/images/neopets/Neopet2.png';
import Neopet3 from '../assets/images/neopets/Neopet3.png';
import Neopet4 from '../assets/images/neopets/Neopet4.png';
import Neopet5 from '../assets/images/neopets/Neopet5.png';
import Neopet6 from '../assets/images/neopets/Neopet6.png';
import Neopet7 from '../assets/images/neopets/Neopet7.png';
import Neopet8 from '../assets/images/neopets/Neopet8.png';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';

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
    alert('Your avatar is submitted!');
    event.preventDefault();
  }

  render() {
    return (
      <div className="jumbotron jumbotron-style">
      <form onSubmit={this.handleSubmit}>
        <label>
          <h1>Name your avatar:</h1>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <Grid>
           <Col className="avatar" xs={6} md={3}>
				       <img className="avatarimage"alt="171x180" src={Neopet1} />
               <p>Speed: 5</p>
               <p>Agility: 3 </p>
               <p>Intelligence: 6 </p>
			     </Col>
           <Col className="avatar" xs={6} md={3}>
               <img className="avatarimage" alt="171x180" src={Neopet2} />
               <p>Speed: 5</p>
               <p>Agility: 3 </p>
               <p>Intelligence: 6 </p>
           </Col>
           <Col className="avatar" xs={6} md={3}>
               <img className="avatarimage" alt="171x180" src={Neopet3} />
               <p>Speed: 5</p>
               <p>Agility: 3 </p>
               <p>Intelligence: 6 </p>
           </Col>
           <Col className="avatar" xs={6} md={3}>
               <img className="avatarimage" alt="171x180" src={Neopet4} />
               <p>Speed: 5</p>
               <p>Agility: 3 </p>
               <p>Intelligence: 6 </p>
           </Col>
           <Col className="avatar" xs={6} md={3}>
               <img className="avatarimage" alt="171x180" src={Neopet5} />
               <p>Speed: 5</p>
               <p>Agility: 3 </p>
               <p>Intelligence: 6 </p>
           </Col>
           <Col className="avatar" xs={6} md={3}>
               <img className="avatarimage" alt="171x180" src={Neopet6} />
               <p>Speed: 5</p>
               <p>Agility: 3 </p>
               <p>Intelligence: 6 </p>
           </Col>
           <Col className="avatar" xs={6} md={3}>
               <img className="avatarimage" alt="171x180" src={Neopet7} />
               <p>Speed: 5</p>
               <p>Agility: 3 </p>
               <p>Intelligence: 6 </p>
           </Col>
           <Col className="avatar" xs={6} md={3}>
               <img className="avatarimage" alt="171x180" src={Neopet8} />
               <p>Speed: 5</p>
               <p>Agility: 3 </p>
               <p>Intelligence: 6 </p>
           </Col>
	      </Grid>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default CreateAvatar
