import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { postdata } from "../services/studentservices";
import { toast } from "react-toastify";

export function StudentRegistration() {
  const [formData, setFormdata] = useState({
    id: "",
    name: "",
    phone: "",
    marks: "",
  });

  function onhandlechange(event) {
    setFormdata({ ...formData, [event.target.name]: event.target.value });
  }

  async function handlesubmit(event) {
    event.preventDefault();
    try {
      console.log(formData);
      const response = await postdata(formData);
      console.log(response);
      if (response.status === 200) {
        toast.success("Student Registered Successfully!!!");
      } else {
        toast.error("Something went wrong !!!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className="mt-4">
      <Alert variant="success">
        <h2>Register a Student</h2>
      </Alert>
      <Container className="mt-3">
        <Form onSubmit={handlesubmit}>
          <Row>
            <Col lg={4}>
              <Form.Group className="mb-3">
                <Form.Label>Id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Id..."
                  name="id"
                  onChange={onhandlechange}
                />
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name..."
                  name="name"
                  onChange={onhandlechange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Phone Number..."
                  name="phone"
                  onChange={onhandlechange}
                />
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group className="mb-3">
                <Form.Label>Marks</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Marks..."
                  name="marks"
                  onChange={onhandlechange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Container>
    </Container>
  );
}
