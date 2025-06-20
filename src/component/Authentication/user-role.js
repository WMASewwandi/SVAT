import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Base_URL from "../../Base/api";
import CreateRole from "./create-role";
import { toast, ToastContainer } from "react-toastify";
import UserRights from "./rights";

const UserRole = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState({});
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

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    if (roles.length > 0) {
      const rolesTable = document.getElementById("rolesTable");
      if (rolesTable) {
        new window.DataTable("#rolesTable");
        const searchInput = document.getElementById("dt-search-0");
        if (searchInput) {
          searchInput.setAttribute("placeholder", "Search...");
        }
      }
    }
  }, [roles]);

  const handleSetRole = async (user) => {
    await setSelectedRole(user);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedRole((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const postData = {
      TypeCode: selectedRole.TypeCode,
      TypeDesc: selectedRole.TypeDesc,
      Inactive: selectedRole.Inactive || 0,
    };
    try {
      const response = await fetch(`${Base_URL}/api/UserType`, {
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
        document.getElementById("close-modal-user-role-edit").click();
        fetchRoles();
      } else {
        toast.error(data.Message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (role) => {
    const postData = {
      TypeCode: role.TypeCode,
      TypeDesc: role.TypeDesc,
      Inactive: role.Inactive,
    };
    try {
      const response = await fetch(`${Base_URL}/api/UserType`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("fetching failed");
      }

      const data = await response.json();
      if (data.Message === "User Deleted Successfully") {
        toast.success("Group Deleted Successfully");
        fetchRoles();
      } else {
        toast.error(data.Message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="row">
        <div className="col-12 d-flex justify-content-between">
          <h4 className="text-uppercase text-red">User Group</h4>
          <button
            data-bs-target="#CreateRole"
            data-bs-toggle="modal"
            className="btn btn-sm btn-theme-outline sm"
          >
            + Add New
          </button>
        </div>
        <div className="col-12 my-3">
          <div className="table-responsive">
            <table
              id="rolesTable"
              className="display"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Group Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{role.TypeCode}</td>
                    <td>{role.TypeDesc}</td>
                    <td>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#ScreenRights"
                        className="btn btn-sm"
                        onClick={() => handleSetRole(role)}
                      >
                        <i className="fa text-primary fa-check"></i>
                      </button>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#EditRole"
                        className="btn btn-sm"
                        onClick={() => handleSetRole(role)}
                      >
                        <i className="fa text-primary fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm"
                        onClick={() => handleDelete(role)}
                      >
                        <i className="fa text-danger fa-trash"></i>
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
        id="CreateRole"
        tabIndex="-1"
        aria-labelledby="CreateRoleLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="CreateRoleLabel">
                Create Group
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <CreateRole onGroupAdded={fetchRoles} />
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="EditRole"
        tabIndex="-1"
        aria-labelledby="EditRoleLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="EditRoleLabel">
                Edit Group
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
                  <div className="col-12">
                    <div className="form-group mt-1">
                      <div className="row">
                        <div className="col-12">
                          <label className="text-dark">Group Name</label>
                        </div>
                        <div className="col-12">
                          <input
                            disabled
                            type="text"
                            name="TypeCode"
                            className="form-control form-control-sm"
                            value={selectedRole.TypeCode}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group mt-1">
                      <div className="row">
                        <div className="col-12">
                          <label className="text-dark">Description</label>
                        </div>
                        <div className="col-12">
                          <input
                            required
                            type="text"
                            name="TypeDesc"
                            className="form-control form-control-sm"
                            value={selectedRole.TypeDesc}
                            onChange={handleChange}
                          />
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
                              checked={selectedRole.Inactive}
                              onChange={handleChange}
                            />
                            <label className="form-check-label">Inactive</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group d-flex justify-content-between gap-3 mt-3">
                      <button
                        id="close-modal-user-role-edit"
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="ScreenRights"
        tabIndex="-1"
        aria-labelledby="ScreenRightsLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="ScreenRightsLabel">
                User Rights
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <UserRights role={selectedRole} fetchItems={fetchRoles}/>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserRole;
