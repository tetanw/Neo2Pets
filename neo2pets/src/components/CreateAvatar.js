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
          <input className= "inputbox jumbotron-style" type="text" maxlength="20" value={this.state.value} onChange={this.handleChange} />
        </label>
        <div>
          <p>Choose your avatar and start skill levels! choose wisely!</p>
        </div>
        <Grid>
           <Col xs={8} sm={6} md={3}>
             <div className="block">
				       <img className="avatarimage" src={Neopet1} />
               <div className="avatartext">
               <p>Speed: 5</p>
               <p>Agility: 4</p>
               <p>Intelligence: 6 </p>
               </div>
             </div>
			     </Col>
           <Col xs={8} sm={6} md={3}>
             <div className="block">
              <img className="avatarimage" src={Neopet2} />
               <div className="avatartext">
               <p>Speed: 5</p>
               <p>Agility: 5</p>
               <p>Intelligence: 5</p>
               </div>
             </div>
          </Col>
          <Col xs={8} sm={6} md={3}>
            <div className="block">
             <img className="avatarimage" src={Neopet3} />
              <div className="avatartext">
              <p>Speed: 6</p>
              <p>Agility: 4 </p>
              <p>Intelligence: 5 </p>
              </div>
            </div>
         </Col>
         <Col xs={8} sm={6} md={3}>
           <div className="block">
            <img className="avatarimage" src={Neopet4} />
             <div className="avatartext">
             <p>Speed: 3</p>
             <p>Agility: 5 </p>
             <p>Intelligence: 7 </p>
             </div>
           </div>
        </Col>
        <Col xs={8} sm={6} md={3}>
          <div className="block">
           <img className="avatarimage" src={Neopet5} />
            <div className="avatartext">
            <p>Speed: 5</p>
            <p>Agility: 6 </p>
            <p>Intelligence: 4 </p>
            </div>
          </div>
       </Col>
       <Col xs={8} sm={6} md={3}>
         <div className="block">
          <img className="avatarimage" src={Neopet6} />
           <div className="avatartext">
           <p>Speed: 6</p>
           <p>Agility: 3 </p>
           <p>Intelligence: 6 </p>
           </div>
         </div>
      </Col>
      <Col xs={8} sm={6} md={3}>
        <div className="block">
         <img className="avatarimage" src={Neopet7} />
          <div className="avatartext">
          <p>Speed: 2</p>
          <p>Agility: 4 </p>
          <p>Intelligence: 9 </p>
          </div>
        </div>
     </Col>
     <Col xs={8} sm={6} md={3}>
       <div className="block">
        <img className="avatarimage" src={Neopet8} />
         <div className="avatartext">
         <p>Speed: 5</p>
         <p>Agility: 7</p>
         <p>Intelligence: 3</p>
         </div>
       </div>
    </Col>
	      </Grid>
        <input className= "inputbox jumbotron-style" type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default CreateAvatar
