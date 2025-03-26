// app/page.js
"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create or Update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/users/${editId}` : "/api/users";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      fetchUsers();
      setName("");
      setEmail("");
      setEditId(null);
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user._id);
  };

  // Soft delete user
  const handleDelete = async (id) => {
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) fetchUsers();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User CRUD</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          {editId ? "Update" : "Add"} User
        </button>
      </form>

      {/* User List */}
      <ul>
        {users.map((user) => (
          <li key={user._id} className="flex justify-between items-center border-b py-2">
            <span>
              {user.name} - {user.email}
            </span>
            <div>
              <button
                onClick={() => handleEdit(user)}
                className="bg-yellow-500 text-white p-1 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-500 text-white p-1"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}