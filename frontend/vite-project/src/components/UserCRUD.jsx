import React, { useState, useEffect } from "react";
import axios from "axios";

const UserCRUD = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ name: "", email: "", age: "" });
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:5000/api/users";

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Create or update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${API_URL}/${editingId}`, user);
        setEditing(false);
        setEditingId(null);
      } else {
        await axios.post(API_URL, user);
      }
      setUser({ name: "", email: "", age: "" });
      fetchUsers();
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setEditing(true);
    setEditingId(user._id);
    setUser({ name: user.name, email: user.email, age: user.age });
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={user.age}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editing ? "Update User" : "Add User"}
        </button>
      </form>

      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.age}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserCRUD;
