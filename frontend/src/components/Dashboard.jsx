import { Alert, Container } from "react-bootstrap";

export function Dashboard() {
    return (
        <Container className="mt-4">
            <Alert variant="success">
                <h2>Welcome to Student Management App</h2>
            </Alert>
            <p> CRUD operations ....</p>
        </Container>
    )
}
