import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { getdatabyid, postdata, updatedata } from "../services/studentservices";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateRecord() {
  // Extracting URL parameters to get the student ID
  const params = useParams(); // {id:101} -> params.id
  const navigate = useNavigate();

  // State to store student form data
  const [formData, setFormdata] = useState({
    id: "",
    name: "",
    phone: "",
    marks: "",
  });

  // Fetch student details by ID when the component mounts
  async function getstudentbyid() {
    try {
      // Fetching student data using the ID from the URL params
      const response = await getdatabyid(params.id);
      setFormdata(response.data); // Update the form data with the fetched student details
    } catch (error) {
      console.log(error);
      toast.error("Something went viral"); // Show error notification if the fetch fails
    }
  }

  // Fetch student data on component mount
  useEffect(() => {
    getstudentbyid();
  }, []);

  // Handle form input changes
  function onhandlechange(event) {
    // Update the form data state based on user input
    setFormdata({ ...formData, [event.target.name]: event.target.value });
  }

  // Handle form submission for updating student data
  async function handlesubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      console.log(formData); // Log the current form data
      const response = await updatedata(params.id, formData); // Send the updated data to the server
      console.log(response);
      if (response.status === 200) {
        toast.success("Student Updated Successfully!!!"); // Show success notification on successful update
        navigate("/studentslist"); // Redirect to the students list page
      } else {
        toast.error("Something went wrong !!!"); // Show error notification if the update fails
      }
    } catch (error) {
      console.log(error); // Log any errors to the console
    }
  }

  return (
    <Container className="mt-4">
      {/* Page heading for updating student records */}
      <Alert variant="success">
        <h4>Update Student record</h4>
      </Alert>
      <Container className="mt-3">
        {/* Student update form */}
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
                  value={formData.id}
                  disabled // ID is not editable
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
                  value={formData.name}
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
                  value={formData.phone}
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
                  value={formData.marks}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Update button to submit the form */}
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Container>
    </Container>
  );
}
