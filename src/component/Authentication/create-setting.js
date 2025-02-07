import React, { useState } from "react";
import Base_URL from "../../Base/api";
import { toast } from "react-toastify";

const CreateSetting = ({ onGroupAdded }) => {
  const [formData, setFormData] = useState({
    Description: "",
    Value: "",
    IsSVAT: true,
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
      const response = await fetch(`${Base_URL}/api/settings`, {
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
      if (data.Message === "Setting saved successfully.") {
        toast.success("Group Saved Successfully");
        document.getElementById("close-modal-setting").click();
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
                <label className="text-secondary">Description</label>
              </div>
              <div className="col-12">
                <input
                  required
                  type="text"
                  name="Description"
                  className="form-control form-control-sm"
                  value={formData.Description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-12">
                <label className="text-secondary">Value</label>
              </div>
              <div className="col-12">
                <input
                  required
                  type="number"
                  name="Value"
                  className="form-control form-control-sm"
                  value={formData.Value}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>   
          <div className="form-group d-flex justify-content-between gap-3 mt-3">
            <button
              id="close-modal-setting"
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

export default CreateSetting;
