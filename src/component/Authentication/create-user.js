import React, { useEffect, useState } from "react";
import Base_URL from "../../Base/api";
import { toast } from "react-toastify";

const CreateUsers = ({ onUserAdded, branches }) => {
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

  useEffect(() => {
    fetchRoles();
  }, []);

  const [formData, setFormData] = useState({
    Name: "",
    UserName: "",
    Password: "",
    UserRole: 1,
    UserType: "",
    Inactive: 1,
  });

  const handleSetCreateBranch = (isChecked, branchCode) => {
    setSelectedBranches((prev) => {
      if (isChecked) {
        return [...prev, { branchCode }];
      } else {
        return prev.filter((item) => item.branchCode !== branchCode);
      }
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${Base_URL}/api/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("fetching failed");
      }

      const data = await response.json();
      const newUser = data.UserId;

      if (data.Message === "Successfully User Created") {
        toast.success(data.Message);
        document.getElementById("close-modal-user-create").click();
        if (onUserAdded) {
          alert();
          onUserAdded();
        }

        const userBranches = selectedBranches.map((item) => {
          return {
            UserId: newUser,
            BranchCode: item.branchCode,
          };
        });

        try {
          const branchResponse = await fetch(`${Base_URL}/api/LoginBranch`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userBranches),
          });

          if (!branchResponse.ok) {
            throw new Error("fetching failed");
          }
        } catch (error) {
          console.error("Error:", error);
        }
        onUserAdded();
      } else {
        toast.error(data.Message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
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
              <div className="col-12">
                <label className="text-dark">Name</label>
              </div>
              <div className="col-12">
                <input
                  required
                  type="text"
                  name="Name"
                  className="form-control form-control-sm"
                  value={formData.Name}
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
                  name="UserName"
                  className="form-control form-control-sm"
                  value={formData.UserName}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/* <div className="form-group mt-1">
            <div className="row">
              <div className="col-12">
                <label className="text-dark">Password</label>
              </div>
              <div className="col-12">
                <input
                  required
                  type="text"
                  name="Password"
                  className="form-control form-control-sm"
                  value={formData.Password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div> */}
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-12">
                <label className="text-dark">User Role</label>
              </div>
              <div className="col-12">
                <select onChange={handleChange} name="UserType" className="form-select" required>
                  <option selected disabled>Select a Role</option>
                  {roles.map((role, index) => (
                    <option key={index} value={role.TypeCode}>{role.TypeCode}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* <div className="form-group mt-1">
            <div className="row">
              <div className="col-12">
                <label className="text-dark">User Type</label>
              </div>
              <div className="col-12">
                <input
                  required
                  type="text"
                  name="UserType"
                  className="form-control form-control-sm"
                  value={formData.UserType}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div> */}

          <div className="form-group mt-1">
            <div className="row">
              <div className="col-12">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="Inactive"
                    checked={formData.Inactive}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Inactive</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
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
                        onChange={(e) =>
                          handleSetCreateBranch(
                            e.target.checked,
                            branch.BranchCode
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
        <div className="col-12">
          <div className="form-group d-flex justify-content-between gap-3 mt-3">
            <button
              id="close-modal-user-create"
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
  );
};

export default CreateUsers;
