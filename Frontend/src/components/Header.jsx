import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import '../assets/global.css';

function Header() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            setError("Failed to log out ");
        }
    }

    return (
        <Navbar bg="white" variant="light" expand="lg" className="fixed-top border-bottom">
            <Container>
                <Navbar.Brand>Admin Dashboard</Navbar.Brand>
                <Nav className="ms-auto">
                    <Button variant="dark" onClick={handleLogout}>Logout</Button>
                </Nav>
            </Container>
        </Navbar>
    );
    
}

export default Header;
