import React from "react";
import Layout from "../Layout";

const ReportBulkInvoice = () => {
  return (
    <Layout>
      <div className="row">
        <div className="col-12 d-flex justify-content-between">
          <h4 className="text-uppercase text-red">Bulk Invoice Print</h4>
        </div>
        <div className="col-12 mb-3">
          <div className="row">
            <div className="col-lg-6 col-12">
              <div className="main-form p-4">
                <nav>
                  <div className="nav nav-tabs w-100" id="print" role="tablist">
                    <button
                      className="nav-link w-50 rounded-0 active"
                      id="nav-home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-home"
                      type="button"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                    >
                      HAWB Wise
                    </button>
                    <button
                      className="nav-link w-50 rounded-0"
                      id="nav-profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-profile"
                      type="button"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      Date Wise
                    </button>
                  </div>
                </nav>
                <div className="tab-content" id="printContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                    tabIndex="0"
                  >
                    <div className="row mt-3">
                      <div className="col-12">
                        <label className="text-secondary mb-2">
                          Enter the HAWB No
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                        />
                      </div>
                    </div>
                    <div className="row mt-auto">
                      <div className="col-12 mt-3">
                        <button type="button" className="btn btn-theme w-100">
                          Print
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                    tabIndex="0"
                  >
                    <div className="row mt-3">
                      <div className="col-12">
                        <label className="text-secondary mb-2">
                          Enter Date
                        </label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                        />
                      </div>
                      <div className="col-12 mt-2">
                        <label className="text-secondary mb-2">
                          Enter Customer Name
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                        />
                      </div>
                      <div className="col-12 mt-3">
                        <button type="button" className="btn btn-theme w-100">
                          print
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportBulkInvoice;
