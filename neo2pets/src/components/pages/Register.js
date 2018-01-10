import React, { Component } from 'react';
import logo from '../../assets/images/Logo.png'
import {
  Jumbotron,
  Button,
  Form,
  FormGroup,
  FormControl,
  Col,
  Checkbox,
  ControlLabel,
  Row,
  Grid
} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';


class App extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }



  render() {
    return (
      <div className="main" name="">
        <Jumbotron className=" jumbotron-style">
          <Grid>
            <Row>
              <Col sm={1}>
                <img src={logo} max-height="150px" max-width="30%" />
              </Col>
            </Row>
            <Row>
              <Form horizontal>

                <FormGroup controlId="formHorizontalUsername">
                  <Col componentClass={ControlLabel} sm={3}>
                    Username
		            	</Col>
                  <Col sm={5}>
                    <FormControl className="inputbox jumbotron-style" type="text" placeholder="Username" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalUsername">
                  <Col componentClass={ControlLabel} sm={3}>
                    E-mail
		            	</Col>
                  <Col sm={5}>
                    <FormControl className="inputbox jumbotron-style" type="email" placeholder="E-mail" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={3}>
                    Password
			            </Col>

                  <Col sm={5}>
                    <FormControl className="inputbox jumbotron-style" type="password" placeholder="Password" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={3}>
                   Type password again
			            </Col>

                  <Col sm={5}>
                    <FormControl className="inputbox jumbotron-style" type="password" placeholder="Password" />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={3} sm={1}>
                  <LinkContainer to="/login">
                    <Button  type="submit">Register</Button>
                  </LinkContainer>
                  </Col>

                </FormGroup>
              </Form>
            </Row>
          </Grid>
        </Jumbotron>
      </div>
    )
  }



}

export default App;


