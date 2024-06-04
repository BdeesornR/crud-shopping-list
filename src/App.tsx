import { useState } from 'react';
import Axios from 'axios';
import { Button, Form, Input, Space } from 'antd';

import logo from './logo.svg';
import './App.css';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOnClick = (evt: React.MouseEvent<HTMLElement>) => {
    Axios.post("http://localhost:8080/users/sign-up", {
      username: username,
      email: "test@custom_mail.com",
      password: password
    }, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }).then(res => {
      console.log("res", res);
    }).catch(err => {
      console.log("err", err);
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Form
          name="log-in-form"
          layout="vertical"
        >
          <Space className="d-flex">
            <Form.Item
              layout="vertical"
              label="Username"
            >
              <Input id="username" name="username" value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
            </Form.Item>
            <Form.Item
              layout="vertical"
              label="Password"
            >
              <Input id="password" name="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </Form.Item>
          </Space>
          <Form.Item>
            <Button type="primary" onClick={handleOnClick}>Save</Button>
          </Form.Item>
        </Form>
      </header>
    </div>
  );
}

export default App;
