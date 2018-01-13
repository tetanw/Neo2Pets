import React, {Component} from 'react';
import { Button, Grid, Row, Col, Thumbnail, ProgressBar } from 'react-bootstrap';
import Default from '../../../assets/images/default.png';

var happiness = 30;
var col = '';
var status = '';
var speed = 50;
var agility = 40;
var intelligence = 70;

if (happiness <= 30) {
  col = 'danger';
  status = 'very unhappy, feed it and play games with ';
} else if (happiness <= 60) {
  col = 'unhappy';
  status = 'unhappy, improve the happiness by playing games and feeding';
} else {
  col = 'success';
  status = 'happy, play games and feed it to make it even happier!';
}


class Avatar extends Component {
  render() {
    return (
      <div className="jumbotron jumbotron-style">
      <Grid>
         <Col xs={8} sm={6} md={4}>
           <div className="block">
             <img className="avatarimage" src={Default}/>
             <div className="avatartext">
             <p>Pet state:</p>
             Happiness <ProgressBar bsStyle={col} className="progressbar" active now={happiness} />
             <p>Your pet is: {status}</p>
             </div>
           </div>
         </Col>
         {/*}<Col xs={12} sm={12} md={8}>
          <div className="block jumbotron-style">
            <div className="padding">
            <h2>Skills</h2>
            <p> improve your skills by playing games! </p>
            speed<ProgressBar className="progressbar" active now={speed} />
            agility<ProgressBar className="progressbar" active now={agility} />
            Intelligence<ProgressBar className="progressbar" active now={intelligence} />
            <br></br>
            </div>
          </div>
         </Col>*/}
         <Col xs={12} sm={12} md={8}>
          <div className="padding inventory block jumbotron-style">
            <h2> Inventory </h2>
            Check your items, or go to the shop and buy more!
            {/*}<Button className="padding margin" href="./inventory">Go to inventory</Button>*/}
          </div>
         </Col>
       </Grid>
       </div>
    );
  }
}

export default Avatar;
