import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Header from "../components/Header";
import { Card, Container } from "react-bootstrap";
import { doc, deleteDoc } from "firebase/firestore";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/");
    return null;
  }

  const handleDeleteUser = async (uid) => {
    try {
      const response = await fetch(`http://localhost:5000/delete-user/${uid}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        alert("User deleted successfully!");
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  

  useEffect(() => {
    const details = onSnapshot(collection(db, "users"), (snapshot) => { 
      const usersList = snapshot.docs.map(doc => ({...doc.data(),uid: doc.id}));
      const filterAd = usersList.filter(user => !user.isAdmin); // filter admin
      setUsers(filterAd);
    });
    return () => details();  
  }, [currentUser]);

  return (
    <div className="d-flex justify-content-center align-items-start min-vh-100" style={{ paddingTop: "40px"}}>
      <Header />
      <Container className="mt-5">
        <h2 className="text-center mb-4">Registered Users</h2>
          {users.map((currentUser, index) => (
            <Card key={index} className="mb-3 shadow-sm">
              <Card.Body>
                <h5 className="card-title">Full Name:</h5>
                <p className="card-text">{currentUser.fullName}</p>
                <h5 className="card-title">Email Address:</h5>
                <p className="card-text">{currentUser.email}</p>
                <button onClick={() => handleDeleteUser(currentUser.uid)} className="btn btn-danger">
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

