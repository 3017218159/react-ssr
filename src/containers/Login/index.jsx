import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  componentDidMount() {
    console.log('sssss', this.props);
  }
  render() {
    const props = this.props;
    return (
      <div>
        <h1>登录页</h1>
        <br />
        <Link to="/">跳转到首页</Link>
      </div>
    );
  }
}

export default Login;
