import { useState, useEffect } from "react";

function Users() {

  const [name, setName] = useState("");
  const [membershipId, setMembershipId] = useState("");
  const [role, setRole] = useState("Librarian");

  const [users, setUsers] = useState([]);

  // Load users from Local Storage
  useEffect(() => {

    const savedUsers = localStorage.getItem("users");

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }

  }, []);

  // Add user
  const addUser = (e) => {

    e.preventDefault();

    const newUser = {
      id: Date.now(),
      name: name,
      membershipId: membershipId,
      role: role
    };

    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);

    // Save users to Local Storage
    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    // Clear form
    setName("");
    setMembershipId("");
    setRole("Librarian");

    alert("User added successfully!");
  };

  // Delete user
  const deleteUser = (id) => {

    const updatedUsers = users.filter(
      (user) => user.id !== id
    );

    setUsers(updatedUsers);

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );
  };

  return (
    <div>

      <h1 className="page-title">
        User Management
      </h1>

      {/* Add User */}

      <div className="form-container">

        <h2>Add New User</h2>

        <br />

        <form onSubmit={addUser}>

          <div className="form-group">

            <label>Name</label>

            <input
              type="text"
              placeholder="Enter user's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

          </div>

          <div className="form-group">

            <label>Membership ID</label>

            <input
              type="text"
              placeholder="Enter membership ID"
              value={membershipId}
              onChange={(e) =>
                setMembershipId(e.target.value)
              }
              required
            />

          </div>

          <div className="form-group">

            <label>Role</label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >

              <option value="Admin">
                Admin
              </option>

              <option value="Librarian">
                Librarian
              </option>

            </select>

          </div>

          <button type="submit">
            Add User
          </button>

        </form>

      </div>

      <br />

      {/* User List */}

      <div className="table-container">

        <h2>Registered Users</h2>

        <br />

        <table>

          <thead>

            <tr>
              <th>Name</th>
              <th>Membership ID</th>
              <th>Role</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {users.length === 0 ? (

              <tr>
                <td colSpan="4">
                  No users added yet.
                </td>
              </tr>

            ) : (

              users.map((user) => (

                <tr key={user.id}>

                  <td>{user.name}</td>

                  <td>{user.membershipId}</td>

                  <td>{user.role}</td>

                  <td>

                    <button
                      onClick={() =>
                        deleteUser(user.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Users;