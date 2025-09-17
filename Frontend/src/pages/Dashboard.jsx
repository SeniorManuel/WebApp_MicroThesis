import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Card, Container } from "react-bootstrap";
import { deleteUser, getUsers } from "../api"; 
import '../assets/global.css';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

   useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        const filterAd = data.filter(user => !user.isAdmin); // remove admins
        setUsers(filterAd);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentUser]);

  const handleDeleteUser = async (uid) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const result = await deleteUser(uid);
      alert(result.message);
      const data = await getUsers();
      const filterAd = data.filter(user => !user.isAdmin);
      setUsers(filterAd);
    } catch (error) {
      alert("Error deleting user: " + error.message);
    }
  };

  // const handleDeleteUser = async (uid) => {
  //   const result = await deleteUser(uid); // API helper
  //   alert(result.message); // show backend response 
  // };

  return (
    <div className="d-flex justify-content-center align-items-start min-vh-100">
      <Header />
      <Container className="mt-5">
        <h2 className="text-center mt-5 mb-4">Registered Users</h2>
        {users.map((user, index) => (
          <Card key={index} className="mb-3 shadow-sm">
            <Card.Body>
              <h5 className="card-title">Full Name:</h5>
              <p className="card-text">{user.displayName || user.fullName || "No name"}</p>
              <h5 className="card-title">Email Address:</h5>
              <p className="card-text">{user.email}</p>
              <button
                onClick={() => handleDeleteUser(user.uid)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default Dashboard;


