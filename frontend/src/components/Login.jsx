import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { loginadmin, storetoken } from "../services/adminservices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({ username: "", password: "" });

  function handleChange(event) {
    setformdata({ ...formdata, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      console.log(formdata);
      const response = await loginadmin(formdata);
      console.log(response);
      if (response.status === 200) {
        toast.success("Logged in successfully!!!");
        //console.log(response.data.token);
        storetoken(response.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong!!!");
      }
    }
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={4}>
          <Alert variant="dark" className="mb-4">
            <h3>Admin Login</h3>
          </Alert>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username..."
                name="username"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password..."
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" variant="success" className="btn">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
