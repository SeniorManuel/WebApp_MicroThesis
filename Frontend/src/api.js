export async function deleteUser(uid) {
  try {
    const response = await fetch(`https://your-backend.onrender.com/delete-user/${uid}`, {
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