import React, { useState } from "react";
import Base_URL from "../../Base/api";
import { toast } from "react-toastify";

const CreateRole = ({ onGroupAdded }) => {
  const [formData, setFormData] = useState({
    TypeCode: "",
    TypeDesc: "",
    Inactive: 0,
  });

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
      const response = await fetch(`${Base_URL}/api/UserType`, {
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
      if (data.Message === "User Saved Successfully") {
        toast.success("Group Saved Successfully");
        document.getElementById("close-modal-user-role").click();
        setFormData({
          TypeCode: "",
          TypeDesc: "",
          Inactive: 0,
        });
        if (onGroupAdded) {
          onGroupAdded();
        }
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
        <div className="col-12">
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-12">
                <label className="text-dark">Group Name</label>
              </div>
              <div className="col-12">
                <input
                  required
                  type="text"
                  name="TypeCode"
                  className="form-control form-control-sm"
                  value={formData.TypeCode}
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
                  value={formData.TypeDesc}
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
                    checked={formData.Inactive}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Active</label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group d-flex justify-content-between gap-3 mt-3">
            <button
              id="close-modal-user-role"
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

export default CreateRole;
