import React, { Component } from 'react';
import logo from '../../assets/images/Logo.png'
import {
  Jumbotron,
  Button,
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel,
  Row,
  Grid
} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import PageContainer from "../layout/PageContainer";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      password2: '',
      email: '',

      messages: []
    };
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    console.log("test");
    if (this.state.password === this.state.password2) {
      fetch('/api/auth/register', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
          })
        }
      )
        .then(res => {
          return res.json();
        })
        .then(res => {
          console.log(res);
          if (res.status !== "SUCCESS") {
            fetch('/api/auth/login', {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: this.state.username,
                  password: this.state.password,
                })
              }
            )
              .then(res => {
                return res.json();
              })
              .then(res => {
                console.log(res);
                if (res.token !== undefined) {
                  this.props.onLogin(res.token, this.state.remember);
                  this.props.history.push("/");
                } else {
                  this.setState({messages: res.messages});
                }
              });
          } else {
            this.setState({messages: res.messages});
          }
        })
    } else {
      this.setState({messages: [{message: "Passwords are not equal"}]});
    }
    e.preventDefault();
  }

  render() {
    return (
      <PageContainer className="main" name="">
        <Jumbotron className=" jumbotron-style">
          <Grid>
            <Row>
              <Col sm={1}>
                <img src={logo} max-height="150px" max-width="30%"/>
              </Col>
            </Row>
            <Row>
              <Form horizontal onSubmit={this.onSubmit}>

                <FormGroup controlId="formHorizontalUsername">
                  <Col componentClass={ControlLabel} sm={3}>
                    Username
                  </Col>
                  <Col sm={5}>
                    <FormControl
                      className="inputbox jumbotron-style"
                      name="username"
                      type="text"
                      value={this.state.username}
                      placeholder="Username"
                      onChange={this.handleChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={3}>
                    E-mail
                  </Col>
                  <Col sm={5}>
                    <FormControl
                      className="inputbox jumbotron-style"
                      name="email"
                      type="email"
                      value={this.state.email}
                      placeholder="E-mail"
                      onChange={this.handleChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={3}>
                    Password
                  </Col>

                  <Col sm={5}>
                    <FormControl
                      label='Password'
                      className="inputbox jumbotron-style"
                      type="password"
                      name="password"
                      value={this.state.password}
                      placeholder="Password"
                      onChange={this.handleChange}
                      validate='required,isLength:6:60'
                    />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPasswordValidation">
                  <Col componentClass={ControlLabel} sm={3}>
                    Type password again
                  </Col>

                  <Col sm={5}>
                    <FormControl
                      label='Confirm Password'
                      className="inputbox jumbotron-style"
                      type="password"
                      name="password2"
                      value={this.state.password2}
                      placeholder="Password"
                      onChange={this.handleChange}
                      validate='required,isLength:6:60'
                        />
                  </Col>
                </FormGroup>

                <Col smOffset={3} sm={5}>
                {this.state.messages !== undefined ? this.state.messages.map((m, i) => <p
                  key={i} style={{textAlign: "center"}}>{m.message}</p>) : null}
                </Col>

                <FormGroup>
                  <Col smOffset={3} sm={5}>
                    <Button  type="submit">Register</Button>
                  </Col>

                </FormGroup>
              </Form>
            </Row>
          </Grid>
        </Jumbotron>
      </PageContainer>
    )
  }
}

export default App;


