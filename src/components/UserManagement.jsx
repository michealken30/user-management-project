import React, { useState, useEffect } from "react";
import axios from "axios";

function UserManagement() {
  const API_URL = "http://localhost:5000";
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [groups, setGroups] = useState([]);

  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
    roleIds: [],
    groupIds: [], // Added groupIds to form
  });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchGroups(); // Fetch groups on component mount
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const usersData = Array.isArray(response.data) ? response.data : [];
      setUsers(usersData);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]); // Fallback to an empty array on error
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/roles`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Fetched roles:", response.data);
      setRoles(response.data);
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/groups`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Fetched groups:", response.data);
      setGroups(response.data);
    } catch (err) {
      console.error("Error fetching groups:", err);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/users`, userForm, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchUsers();
      setUserForm({
        username: "",
        email: "",
        password: "",
        roleIds: [],
        groupIds: [],
      });
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <form
        onSubmit={handleCreateUser}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Username"
            value={userForm.username}
            onChange={(e) =>
              setUserForm({ ...userForm, username: e.target.value })
            }
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={userForm.email}
            onChange={(e) =>
              setUserForm({ ...userForm, email: e.target.value })
            }
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={userForm.password}
            onChange={(e) =>
              setUserForm({ ...userForm, password: e.target.value })
            }
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <select
            multiple
            value={userForm.roleIds}
            onChange={(e) =>
              setUserForm({
                ...userForm,
                roleIds: Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                ),
              })
            }
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {Array.isArray(roles) && roles.length > 0 ? (
              roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))
            ) : (
              <option disabled>No roles available</option>
            )}
          </select>

          {/* Select for Groups */}
          <select
            multiple
            value={userForm.groupIds}
            onChange={(e) =>
              setUserForm({
                ...userForm,
                groupIds: Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                ),
              })
            }
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {Array.isArray(groups) && groups.length > 0 ? (
              groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))
            ) : (
              <option disabled>No groups available</option>
            )}
          </select>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          >
            Create User
          </button>
        </div>
      </form>

      {/* Users List */}
      <div className="grid grid-cols-1 gap-6">
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800">
                {user.username}
              </h3>
              <p className="text-gray-600">{user.email}</p>
              <div className="mt-2">
                <span className="text-sm text-gray-600">
                  Roles: {user.Roles?.map((role) => role.name).join(", ")}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-sm text-gray-600">
                  Groups: {user.Groups?.map((group) => group.name).join(", ")}
                </span>
              </div>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-400"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No users available.</p>
        )}
      </div>
    </div>
  );
}

export default UserManagement;
