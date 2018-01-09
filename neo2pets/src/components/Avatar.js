import React, {Component} from 'react';
import { Button, Grid, Row, Col, Thumbnail, ProgressBar } from 'react-bootstrap';
import Default from '../assets/images/default.png';

class Avatar extends Component {
  render() {
    return (
      <div className="jumbotron jumbotron-style">
      <Grid>
         <Col xs={8} sm={6} md={4}>
           <div className="block">
             <img className="avatarimage" src={Default}/>
             <div className="avatartext">
             <p>Pet state: Happy</p>
             <p>Pet food: not hungry</p>
             </div>
           </div>
         </Col>
         <Col xs={12} sm={12} md={8}>
          <div className="block jumbotron-style">
            <h2>Skills</h2>
            <p> improve your skills by playing games! </p>
            <div >
            speed<ProgressBar className="progressbar" active now={50} />
            agility<ProgressBar className="progressbar" active now={40} />
            Intelligence<ProgressBar className="progressbar" active now={70} />
            <br></br>
            </div>
          </div>
         </Col>
         <Col xs={12} sm={12} md={8}>
          <div className="block jumbotron-style">
            <h2> Inventory </h2>
            <Button href="./inventory" jumbotron-style>Go to inventory</Button>
          </div>
         </Col>
       </Grid>
       </div>
    );
  }
}

export default Avatar;
