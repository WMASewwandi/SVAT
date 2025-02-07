import React, { useEffect, useState } from "react";
import Base_URL from "../../Base/api";
import CreateRole from "./create-role";
import { toast, ToastContainer } from "react-toastify";

const UserRights = () => {
  return (
    <form>
      <div className="row">
        <div className="col-12">
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-12">
                <h6 className="fw-bold text-uppercase text-danger">
                  Screen Rights
                </h6>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <h6 className="fw-bold text-uppercase">Master</h6>
                <ul className="list-unstyled">
                  <li>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Item Master</label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">
                        Customer Master
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <h6 className="fw-bold text-uppercase">SVAT Invoice</h6>
                <ul className="list-unstyled">
                  <li>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">
                        SVAT Invoice View
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">
                        SVAT Invoice Create
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <h6 className="fw-bold text-uppercase">Reports</h6>
                <ul className="list-unstyled">
                  <li>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">
                        Customer Report
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">
                        Bulk Invoice Report
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <h6 className="fw-bold text-uppercase">Authentication</h6>
                <ul className="list-unstyled">
                  <li>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">
                        Create User Group
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Create User</label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">
                        Add Screen Rights
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">
                        Add Branch Rights
                      </label>
                    </div>
                  </li>
                </ul>
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

export default UserRights;
