import React, { useState } from "react";
import Base_URL from "../../Base/api";
import { toast } from "react-toastify";

const CreateCustomer = ({ onCustomerAdded }) => {
  const [formData, setFormData] = useState({
    CustomerCode: "",
    CustomerSapCode: "",
    CustomerName: "",
    CustomerVatNo: "",
    CustomerSVatNo: "",
    CustomerAdd1: "",
    CustomerAdd2: "",
    CustomerAdd3: "",
    CustomerEmail: "",
    CustomerConNo: "",
    CustomerFaxNo: "",
    AllowEditDetails: 0,
    Inactive: 1,
    CustomerType: 2,
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
      const response = await fetch(`${Base_URL}/api/customer`, {
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
      if (data.Message === "Customer Successfully Saved") {
        toast.success(data.Message);
        document.getElementById("close-modal").click();
        if (onCustomerAdded) {
          onCustomerAdded();
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
              <div className="col-4">
                <label className="text-dark">IBS Code</label>
              </div>
              <div className="col-8">
                <input
                  required
                  type="text"
                  name="CustomerCode"
                  value={formData.CustomerCode}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Sap Code</label>
              </div>
              <div className="col-8">
                <input
                  required
                  type="text"
                  name="CustomerSapCode"
                  value={formData.CustomerSapCode}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Customer Name</label>
              </div>
              <div className="col-8">
                <input
                  required
                  type="text"
                  name="CustomerName"
                  value={formData.CustomerName}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">VAT No</label>
              </div>
              <div className="col-8">
                <input
                  required
                  type="text"
                  name="CustomerVatNo"
                  value={formData.CustomerVatNo}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">SVAT No</label>
              </div>
              <div className="col-8">
                <input
                  required
                  type="text"
                  name="CustomerSVatNo"
                  value={formData.CustomerSVatNo}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Address 1</label>
              </div>
              <div className="col-8">
                <input
                  required
                  type="text"
                  name="CustomerAdd1"
                  value={formData.CustomerAdd1}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Address 2</label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name="CustomerAdd2"
                  value={formData.CustomerAdd2}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Address 3</label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name="CustomerAdd3"
                  value={formData.CustomerAdd3}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Email</label>
              </div>
              <div className="col-8">
                <input
                  type="email"
                  required
                  name="CustomerEmail"
                  value={formData.CustomerEmail}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Fax No</label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name="CustomerFaxNo"
                  value={formData.CustomerFaxNo}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Contact No</label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  required
                  name="CustomerConNo"
                  value={formData.CustomerConNo}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row d-flex justify-content-end">
              <div className="col-8">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="AllowEditDetails"
                    checked={formData.AllowEditDetails}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Allow Edit</label>
                </div>
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
          <div className="form-group d-flex justify-content-between gap-3 mt-3">
            <button
              id="close-modal"
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

export default CreateCustomer;
