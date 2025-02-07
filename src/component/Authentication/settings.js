import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Base_URL from "../../Base/api";
import { toast, ToastContainer } from "react-toastify";
import CreateSetting from "./create-setting";

const Settings = () => {
  const [settings, setSettings] = useState([]);
  const [selectedSetting, setSelectedSetting] = useState({});
  const fetchSettings = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/settings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("fetching failed");
      }

      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (settings.length > 0) {
      const settingsTable = document.getElementById("settingsTable");
      if (settingsTable) {
        new window.DataTable("#settingsTable");
        const searchInput = document.getElementById("dt-search-0");
        if (searchInput) {
          searchInput.setAttribute("placeholder", "Search...");
        }
      }
    }
  }, [settings]);

  const handleSetSetting = async (setting) => {
    await setSelectedSetting(setting);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedSetting((prevSetting) => ({
      ...prevSetting,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      Description: selectedSetting.Description,
      Value: selectedSetting.Value,
      IsSVAT: selectedSetting.IsSVAT,
    };
    try {
      const response = await fetch(`${Base_URL}/api/settings`, {
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
      if (data.Message === "Setting Updated Successfully") {
        toast.success(data.Message);
        document.getElementById("close-modal-setting-edit").click();
        fetchSettings();
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
          <h4 className="text-uppercase text-red">Settings</h4>
          <button
            data-bs-target="#CreateSetting"
            data-bs-toggle="modal"
            className="btn btn-sm btn-theme-outline sm"
          >
            + Add New
          </button>
        </div>
        <div className="col-12 my-3">
          <div className="table-responsive">
            <table
              id="settingsTable"
              className="display"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {settings.map((setting, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{setting.Description}</td>
                    <td>{setting.Value}</td>
                    <td align="right">
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#EditSetting"
                        className="btn btn-sm"
                        onClick={() => handleSetSetting(setting)}
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
        id="CreateSetting"
        tabIndex="-1"
        aria-labelledby="CreateSettingLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="CreateSettingLabel">
                Create Setting
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <CreateSetting onGroupAdded={fetchSettings} />
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="EditSetting"
        tabIndex="-1"
        aria-labelledby="EditSettingLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="EditSettingLabel">
                Edit Setting
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
                          <label className="text-secondary">Description</label>
                        </div>
                        <div className="col-12">
                          <input
                            disabled
                            type="text"
                            name="Description"
                            className="form-control form-control-sm"
                            value={selectedSetting.Description}
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
                            type="text"
                            name="Value"
                            className="form-control form-control-sm"
                            value={selectedSetting.Value}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group d-flex justify-content-between gap-3 mt-3">
                      <button
                        id="close-modal-setting-edit"
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
    </Layout>
  );
};

export default Settings;
