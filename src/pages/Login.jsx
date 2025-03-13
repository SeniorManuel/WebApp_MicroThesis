import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault(); //prevents refreshing
    setError(""); //clears previos error

    try {
      const userCredential = await login(email, password);  //call login function in auth
      const user = userCredential.user;

      if (user.uid !== "ERHcLHdhmSVJlaTMlnd8eyTpdkC2") { //admin login
        setError("Unauthorized: Only Admin can log in.");
        await logout();
        return;
      }
      
      navigate("/dashboard");

    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("Email not found. Please check your email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "28rem"}}>
        <Card.Body>
          <h2 className="text-center mb-4">Admin Login</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Control 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
