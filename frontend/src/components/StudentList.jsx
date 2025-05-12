import { useEffect, useState } from "react";
import { Alert, Button, Container, Modal, Table } from "react-bootstrap";
import { deletedata, fetchalldata } from "../services/studentservices.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function StudentList() {
  // State to store the list of students
  const [students, setstudent] = useState([]);

  // State to control the visibility of the delete confirmation modal
  const [showdialogue, setdialogue] = useState(false);

  // State to store the ID of the student selected for deletion
  const [selectedstudentID, SetselectedstudentID] = useState();

  // Function to close the confirmation dialog
  function closedialogue() {
    setdialogue(false);
  }

  const navigate = useNavigate();

  // Function to fetch all student data from the server
  async function getdata() {
    try {
      // Service API call to fetch student data
      const response = await fetchalldata();
      // Updating the student list with the fetched data
      setstudent(response.data);
    } catch (error) {
      console.log(error); // Log any errors to the console
    }
  }

  // Fetch student data when the component mounts
  useEffect(() => {
    getdata();
  }, []);

  // Function to delete a student record
  async function deleterecord() {
    try {
      // Sending a delete request to the server for the selected student
      const response = await deletedata(selectedstudentID);
      if (response.status == 200) {
        toast.success("Student removed !!!"); // Notify success
        closedialogue(); // Close the modal after successful deletion
        // Remove the deleted student from the list
        setstudent(students.filter((s) => s.id !== selectedstudentID));
      } else {
        toast.error("Something went wrong.."); // Notify failure
      }
    } catch (error) {
      console.log(error); // Log any errors to the console
      toast.error("Something went wrong.."); // Notify failure
    }
  }

  return (
    <Container className="mt-4">
      {/* Header for the student list section */}
      <Alert variant="success">
        <h4>List of students</h4>
      </Alert>

      {/* Table to display student data */}
      <Container>
        {students.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Phone No</th>
                <th>Marks</th>
                <th>Action</th>
              </tr>
            </thead>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.phone}</td>
                <td>{s.marks}</td>
                <td>
                  {/* Edit button - functionality to be added */}
                  <Button
                    variant="primary"
                    className="btn-sm me-2"
                    onClick={() => {
                      navigate(`/update/${s.id}`);
                    }}
                  >
                    Edit
                  </Button>
                  {/* Delete button to open confirmation modal */}
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => {
                      SetselectedstudentID(s.id); // Set the ID of the student to be deleted
                      setdialogue(true); // Open the confirmation dialog
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            <tbody></tbody>
          </Table>
        ) : (
          // Message to display if no student records are found
          <h3>No records Found !!!</h3>
        )}
      </Container>

      {/* Modal for delete confirmation */}
      <Modal show={showdialogue} onHide={closedialogue} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete Student with Id : {selectedstudentID}{" "}
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            className="btn-sm me-2"
            onClick={deleterecord}
          >
            YES
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              navigate;
            }}
            className="btn-sm"
          >
            NO
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
