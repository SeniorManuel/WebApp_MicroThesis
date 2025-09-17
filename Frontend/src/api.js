export async function deleteUser(uid) {
  try {
    const response = await fetch(`https://webapp-microthesis-1.onrender.com/delete-user/${uid}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    return await response.json(); // returns { message: "User deleted successfully" }
  } catch (error) {
    console.error("Error deleting user:", error);
    return { message: "Error deleting user" };
  }
}

export async function getUsers() {
  try {
    const response = await fetch("https://webapp-microthesis-1.onrender.com/users", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return await response.json(); // returns an array of users
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}