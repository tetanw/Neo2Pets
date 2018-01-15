import React, {Component} from 'react';
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
import PageContainer from "../layout/PageContainer";


class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      remember: true,

      messages: []
    };
  }

  handleChange(e) {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({[e.target.name]: value});
  }

  onSubmit(e) {
    fetch('/api/auth/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
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

    e.preventDefault();
  }


  render() {
    return (
      <PageContainer>
        <Jumbotron className="jumbotron-style" style={{marginTop: "20px"}}>
          <Grid>
            <Row style={{textAlign: "center"}}>
              <img src={logo} style={{maxWidth: "90%"}}/>
            </Row>
            <Form onSubmit={this.onSubmit} horizontal>
              <Row>

                <FormGroup controlId="formHorizontalUsername">
                  <Col componentClass={ControlLabel} sm={2}>
                    Username
                  </Col>
                  <Col sm={8}>
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

                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={8}>
                    <FormControl
                      className="inputbox jumbotron-style"
                      type="password"
                      name="password"
                      value={this.state.password}
                      placeholder="Password"
                      onChange={this.handleChange}
                    />
                  </Col>
                </FormGroup>

                {this.state.messages !== undefined ? this.state.messages.map((m, i) => <p
                  key={i}>{m.message}</p>) : null}

                <FormGroup>
                  <Col smOffset={3} sm={10}>
                    <Checkbox
                      name="remember"
                      checked={this.state.remember}
                      onChange={this.handleChange}
                    >
                      Remember me
                    </Checkbox>
                  </Col>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup>
                  <Col smOffset={3} sm={1}>
                    <Button type="submit">Sign In</Button>
                  </Col>
                  <Col smOffset={1} sm={1}>
                    <LinkContainer to="/register">
                      <Button type="button" className="register-button">Register</Button>
                    </LinkContainer>
                  </Col>
                </FormGroup>
              </Row>
            </Form>
          </Grid>
        </Jumbotron>
      </PageContainer>
    )
  }


}

export default Login;


