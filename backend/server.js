import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore"; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// use of environment variables
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

const db = getFirestore();

app.get("/users", async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const authUids = new Set(listUsersResult.users.map(u => u.uid));
    const snapshot = await db.collection("users").get();
    
    const users = snapshot.docs
      .map(doc => ({
        uid: doc.id,
        email: doc.data().email || "",
        fullName: doc.data().fullName || "",
        isAdmin: doc.data().isAdmin === "true" || doc.data().admin === "true"
      }))
      .filter(user => authUids.has(user.uid))
      .filter(user => !user.isAdmin);

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


app.delete("/delete-user/:uid", async (req, res) => { // delete user
  const { uid } = req.params;

  try {
    await admin.auth().deleteUser(uid); // delete user from firebase auth
    await db.collection("users").doc(uid).delete(); // delete user from firestore

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});