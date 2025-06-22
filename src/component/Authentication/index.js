import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Base_URL from "../../Base/api";
import { toast, ToastContainer } from "react-toastify";
import CreateUsers from "./create-user";
import * as XLSX from "xlsx";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [branches, setBranches] = useState([]);
  const [userBranches, setUserBranches] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);

  const [roles, setRoles] = useState([]);

  const fetchRoles = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/UserType`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("fetching failed");
      }

      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const fetchUsers = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/createUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("fetching failed");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/branch`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("fetching failed");
      }

      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchUserBranches = async (id) => {
    try {
      const response = await fetch(`${Base_URL}/api/LoginBranch?userId=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("fetching failed");
      }

      const data = await response.json();
      setUserBranches(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchBranches();
    fetchRoles();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const usersTable = document.getElementById("usersTable");
      if (usersTable) {
        new window.DataTable("#usersTable");
        const searchInput = document.getElementById("dt-search-0");
        if (searchInput) {
          searchInput.setAttribute("placeholder", "Search...");
        }
      }
    }
  }, [users]);

  const handleSetUser = async (user) => {
    await setSelectedUser(user);
    fetchUserBranches(user.UserId);
  };

  const handleSetBranch = (value, branchCode, userId) => {
    setSelectedBranches((prev) => {
      const updatedBranches = value
        ? [...prev, { branchCode, userId }]
        : prev.filter((item) => item.branchCode !== branchCode);

      setUserBranches((prevUserBranches) => {
        const updatedUserBranches = value
          ? [...prevUserBranches, { BranchCode: branchCode, UserId: userId }]
          : prevUserBranches.filter(
            (item) => item.BranchCode !== branchCode
          );

        return updatedUserBranches;
      });

      return [...updatedBranches, ...userBranches];
    });
  };



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      Name: selectedUser.Name,
      UserName: selectedUser.Username,
      Inactive: selectedUser.Inactive,
      Password: selectedUser.Password,
      UserType: selectedUser.UserType,
    };
    try {
      const response = await fetch(`${Base_URL}/api/createUser`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("fetching failed");
      }

      const data = await response.json();
      if (data.Message === "Successfully User Updated") {
        toast.success(data.Message);
        document.getElementById("close-modal-user").click();
        fetchUsers();
      } else {
        toast.error(data.Message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    try {
      const response = await fetch(`${Base_URL}/api/LoginBranch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userBranches),
      });

      if (!response.ok) {
        throw new Error("fetching failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleExportToExcel = (list) => {
    const table = document.getElementById("usersTable");
    if (!table) return;

    const tableData = table.querySelectorAll("thead th");
    const headers = [];
    tableData.forEach((header, index) => {
      if (index !== 6 && index !== 0) {
        headers.push(header.innerText);
      }
    });

    const usersData = list.map((user) => {
      return [
        user.Name,
        user.Username,
        user.UserType,
        user.AddedDateTime,
        user.Inactive ? "true" : "false",
      ];
    });

    const data = [headers, ...usersData];

    const ws = XLSX.utils.aoa_to_sheet(data);

    const headerCells = ws["A1:F1"];
    if (headerCells) {
      headerCells.forEach((cell) => {
        if (cell) {
          cell.s = {
            fill: {
              fgColor: { rgb: "FFFF00" },
            },
            font: { bold: true },
          };
        }
      });
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, ws, "Users");

    XLSX.writeFile(workbook, "UsersData.xlsx");
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="row">
        <div className="col-12 d-flex justify-content-between">
          <h4 className="text-uppercase text-red m-0">Users</h4>
          <div className="d-flex gap-2">
            <button
              onClick={() => handleExportToExcel(users)}
              className="btn btn-sm border border-success"
            >
              <i className="fa text-success fa-download"></i>
            </button>
            <a
              data-bs-toggle="modal"
              data-bs-target="#CreateUser"
              className="btn btn-sm btn-theme-outline sm"
            >
              + Add User
            </a>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="table-responsive">
            <table
              id="usersTable"
              className="display"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>User Group</th>
                  <th>Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.Name}</td>
                    <td>{user.Username}</td>
                    <td>{user.UserType}</td>
                    <td>
                      <span
                        className={`badge ${user.Inactive ? "bg-secondary" : "bg-primary"
                          }`}
                      >
                        {user.Inactive ? "false" : "true"}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleSetUser(user)}
                        className="btn btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#EditUser"
                      >
                        <i className="fa text-primary fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="CreateUser"
        tabIndex="-1"
        aria-labelledby="CreateUserLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="CreateUserLabel">
                Create User
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <CreateUsers onUserAdded={fetchUsers} branches={branches} />
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="EditUser"
        tabIndex="-1"
        aria-labelledby="EditUserLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="EditUserLabel">
                Edit User
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div className="form-group mt-1">
                      <div className="row">
                        <div className="col-12">
                          <h6 className="fw-bold text-uppercase text-danger">
                            User Details
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="form-group mt-1">
                      <div className="row">
                        <div className="col-12">
                          <label className="text-dark">Name</label>
                        </div>
                        <div className="col-12">
                          <input
                            required
                            type="text"
                            name="Name"
                            className="form-control form-control-sm"
                            value={selectedUser.Name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group mt-1">
                      <div className="row">
                        <div className="col-12">
                          <label className="text-dark">Username</label>
                        </div>
                        <div className="col-12">
                          <input
                            required
                            type="text"
                            name="Username"
                            className="form-control form-control-sm"
                            value={selectedUser.Username}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group mt-1">
                      <div className="row">
                        <div className="col-12">
                          <label className="text-dark">User Group</label>
                        </div>
                        <div className="col-12">
                          <div className="col-12">
                            <select onChange={handleChange} value={selectedUser.UserType} name="UserType" className="form-select" required>
                              {roles.map((role, index) => (
                                <option key={index} value={role.TypeCode}>{role.TypeCode}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group mt-1">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="Inactive"
                              checked={selectedUser.Inactive}
                              onChange={handleChange}
                            />
                            <label className="form-check-label">Inactive</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group mt-1">
                          <div className="row">
                            <div className="col-12">
                              <h6 className="fw-bold text-uppercase text-danger">
                                Branch Rights
                              </h6>
                            </div>
                            <div className="row">
                              {branches.map((branch, index) => (
                                <div key={index} className="col-lg-6 col-12">
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={userBranches.some(
                                        (userBranch) =>
                                          userBranch.BranchCode ===
                                          branch.BranchCode
                                      )}
                                      onChange={(e) =>
                                        handleSetBranch(
                                          e.target.checked,
                                          branch.BranchCode,
                                          selectedUser.UserId
                                        )
                                      }
                                    />
                                    <label className="form-check-label">
                                      {branch.BranchDesc}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-between gap-3 mt-3">
                    <button
                      id="close-modal-user"
                      data-bs-dismiss="modal"
                      type="button"
                      className="btn btn-sm btn-theme-outline"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-sm btn-theme">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
