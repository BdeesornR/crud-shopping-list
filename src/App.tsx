import { useState } from "react";
import Axios from "./configs/Axios";
import { Button, Card, Col, Form, Input, Row, Space } from "antd";

// import logo from "./logo.svg";
import "./App.css";
import { UserDto } from "./types/responses/UserDto";
import { CommonDto } from "./types/responses/CommonDto";

function App() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [userList, setUserList] = useState<UserDto[]>([]);

	const handleOnSignUp = (evt: React.MouseEvent<HTMLElement>) => {
		Axios.post("users/sign-up", {
			username: username,
			email: "test@custom_mail.com",
			password: password,
		})
			.then((res) => {
				console.log("res", res);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};
	const handleOnFetchUsers = (evt: React.MouseEvent<HTMLElement>) => {
		Axios.get<CommonDto<UserDto[]>>("users/show-all-user")
			.then((res) => {
				console.log("res", res);
				setUserList(res?.data?.resultContent || []);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	return (
		<div className="App">
			<header className="App-header">
				{/* <img src={logo} className="App-logo" alt="logo" /> */}
				<Row className="w-100 mb-3">
					<Col offset={6} span={12}>
						<Card
							title="User List"
							className="text-start"
							actions={[
								<Button type="primary" onClick={handleOnFetchUsers}>
									Fetch Users
								</Button>,
							]}
						>
							{userList?.map((user, index) => {
								return (
									<p key={index} className="text-center">
										{user.username}
									</p>
								);
							})}
						</Card>
					</Col>
				</Row>
				<Row className="w-100">
					<Col offset={6} span={12}>
						<Card
							title="Sign Up"
							className="text-start"
							actions={[
								<Button type="primary" onClick={handleOnSignUp}>
									Save
								</Button>,
							]}
						>
							<Form name="log-in-form" layout="vertical">
								<Space className="d-flex justify-content-center">
									<Form.Item
										className="mb-0"
										layout="vertical"
										label="Username"
									>
										<Input
											id="username"
											name="username"
											value={username}
											placeholder="Username"
											onChange={(e) => setUsername(e.target.value)}
										/>
									</Form.Item>
									<Form.Item
										className="mb-0"
										layout="vertical"
										label="Password"
									>
										<Input
											id="password"
											name="password"
											value={password}
											placeholder="Password"
											onChange={(e) => setPassword(e.target.value)}
										/>
									</Form.Item>
								</Space>
							</Form>
						</Card>
					</Col>
				</Row>
			</header>
		</div>
	);
}

export default App;
