import React from "react";
import "./css/login.css";
import {
  PageHeader,
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Row,
  Col
} from "antd";
import user from "../services/userService";
import auth from "../services/authService";

class NormalLoginForm extends React.Component {
  state = { error: true };
  gotoHome() {
    window.location = "/";
  }
  handleSubmit = async e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log("submitting", values);
      user.register(values).then(response => {
        auth.loginWithJwt(response.data.jwt);
        console.log(response);
      });
    });
  };

  onChange = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      err ? this.setState({ error: true }) : this.setState({ error: false });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <PageHeader title="Log in or Sign up" onBack={this.gotoHome} />
        <Row type="flex" justify="center">
          <Col>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [
                    { required: true, message: "Please input your username!" },
                    {
                      pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                      message: "Invalid e-mail address"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" },
                    {
                      min: 7,
                      message: "Password should be at least 7 characters"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: true
                })(<Checkbox>Remember me</Checkbox>)}
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  disabled={this.state.error}
                >
                  Log in / Sign Up
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
const Login = Form.create({ name: "normal_login" })(NormalLoginForm);
export default Login;
