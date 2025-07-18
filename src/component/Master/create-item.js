import React, { useEffect, useRef, useState } from "react";
import Base_URL from "../../Base/api";
import { toast } from "react-toastify";

const CreateItem = ({ onItemAdded }) => {
  const [formData, setFormData] = useState({
    ItemCode: "",
    ItemDesc: "",
    SapAccCode: "",
    SapGlCode: "",
    CurrencyCode: "USD",
    FormatCalculation: 1,
    TaxCalculation: 1,
    SuspendedTaxCalculation: 0,
    Amount: 0,
    TaxOption: "Tax Enabled",
    TaxRate: "",
    IsAwbRequired: 0,
    AllowEdit: 0,
    Inactive: 0,
    RevenueType: null,
    IsInvoiceItem: 1,
  });

  const firstInputRef = useRef(null);

  useEffect(() => {
    const modal = document.getElementById("EditItem");

    const handleModalShow = () => {
      if (firstInputRef.current) {
        firstInputRef.current.focus();
      }
    };

    modal.addEventListener("shown.bs.modal", handleModalShow);

    return () => {
      modal.removeEventListener("shown.bs.modal", handleModalShow);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
    ...prevData,
    [name]:
      type === "checkbox"
        ? checked
          ? 1
          : 0
        : name === "Amount"
        ? parseFloat(value)
        : name === "RevenueType"
        ? parseInt(value)
        : value,
  }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${Base_URL}/api/item`, {
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
      if (data.Message === "Item Saved Successfully") {
        toast.success(data.Message);
        document.getElementById("close-modal-item").click();
        setFormData({
          ItemCode: "",
          ItemDesc: "",
          SapAccCode: "",
          SapGlCode: "",
          CurrencyCode: "USD",
          FormatCalculation: 1,
          TaxCalculation: 1,
          SuspendedTaxCalculation: 0,
          Amount: 0,
          TaxOption: "Tax Enabled",
          TaxRate: "",
          IsAwbRequired: 0,
          AllowEdit: 0,
          Inactive: 0,
          IsInvoiceItem: 1,
          RevenueType: null,
        });
        if (onItemAdded) {
          onItemAdded();
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
                <label className="text-dark">Item Code</label>
              </div>
              <div className="col-8">
                <input
                  ref={firstInputRef}
                  required
                  type="text"
                  name="ItemCode"
                  className="form-control form-control-sm"
                  value={formData.ItemCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Item Description</label>
              </div>
              <div className="col-8">
                <input
                  required
                  type="text"
                  className="form-control form-control-sm"
                  name="ItemDesc"
                  value={formData.ItemDesc}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Sap Account Code</label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  required
                  className="form-control form-control-sm"
                  name="SapAccCode"
                  value={formData.SapAccCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Sap GL Code</label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  required
                  className="form-control form-control-sm"
                  name="SapGlCode"
                  value={formData.SapGlCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Amount</label>
              </div>
              <div className="col-8">
                <input
                  type="number"
                  required
                  className="form-control form-control-sm"
                  name="Amount"
                  value={formData.Amount}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Tax Option</label>
              </div>
              <div className="col-8 d-flex">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    required
                    id="inlineRadio1"
                    name="TaxOption"
                    value="Tax Enabled"
                    checked={formData.TaxOption === "Tax Enabled"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Tax Enabled
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="inlineRadio2"
                    name="TaxOption"
                    value="Suspended Tax Enabled"
                    checked={formData.TaxOption === "Suspended Tax Enabled"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Suspended Tax Enabled
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Tax Rate</label>
              </div>
              <div className="col-8">
                <div className="input-group input-group-sm">
                  <input
                    type="number"
                    className="form-control"
                    name="TaxRate"
                    required
                    value={formData.TaxRate}
                    onChange={handleChange}
                  />
                  <span className="input-group-text">%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Revenue Type</label>
              </div>
              <div className="col-8 d-flex">
                <select onChange={handleChange} name="RevenueType" className="form-select form-control form-select-sm">
                  <option selected>Select Revenue Type</option>
                  <option value={1}>DHL Revenue</option>
                  <option value={2}>Regulatory Charge</option>
                </select>
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
                    id="inlineCheckbox1"
                    name="AllowEdit"
                    checked={formData.AllowEdit}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox1">
                    Allow Edit
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox2"
                    name="Inactive"
                    checked={formData.Inactive}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox2">
                    Inactive
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group d-flex justify-content-end gap-3 mt-3">
            <button
              type="button"
              id="close-modal-item"
              data-bs-dismiss="modal"
              className="btn btn-sm btn-theme-outline"
            >
              Cancel
            </button>
            <button className="btn btn-sm btn-theme" type="submit">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateItem;
