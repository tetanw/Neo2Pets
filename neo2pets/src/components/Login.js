import React, { Component } from 'react';
import Page from './Page';
import logo from '../assets/images/Logo.png'
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
        <img src={logo} max-height="150px"  max-width="30%"/>
        </Col>
      </Row>
      <Row>
          <Form horizontal>

            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={3}>
                Email
			</Col>
              <Col sm={5}>
                <FormControl className="inputbox jumbotron-style" type="text" placeholder="Username" />
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

            <FormGroup>
              <Col smOffset={3} sm={10}>
                <Checkbox>Remember me</Checkbox>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={3} sm={10}>
                <Button type="submit">Sign in</Button>
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


