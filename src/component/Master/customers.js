import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Base_URL from "../../Base/api";
import CreateCustomer from "./create-customer";
import { ToastContainer } from "react-toastify";
import EditCustomer from "./edit-customer";

const CustomerMaster = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/customer`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("fetching failed");
      }

      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  useEffect(() => {    
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (customers.length > 0) {
      const customerTable = document.getElementById("customerTable");
      if (customerTable) {
        new window.DataTable("#customerTable");
        const searchInput = document.getElementById("dt-search-0");
        if (searchInput) {
          searchInput.setAttribute("placeholder", "Search...");
        }
      }
    }
  }, [customers]);

  return (
    <Layout>
      <ToastContainer/>
      <div className="row">
        <div className="col-12 d-flex justify-content-between">
          <h4 className="text-uppercase text-red">Customers</h4>
          <button
            data-bs-toggle="modal"
            data-bs-target="#CreateCustomer"
            className="btn btn-sm btn-theme-outline sm"
          >
            + Add New
          </button>
        </div>
        <div className="col-12 my-3">
          <div className="table-responsive">
            <table
              id="customerTable"
              className="display"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>IBS Code</th>
                  <th>SAP Code</th>
                  <th>Name</th>
                  <th>VAT No</th>
                  <th>SVAT No</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Fax</th>
                  <th>Contact No</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{customer.CustomerCode}</td>
                    <td>{customer.CustomerSapNo}</td>
                    <td>{customer.CustomerName}</td>
                    <td>{customer.CustomerVatNo}</td>
                    <td>{customer.CustomerSVatNo}</td>
                    <td>{customer.CustomerAdd1}</td>
                    <td>{customer.CustomerEmail}</td>
                    <td>{customer.CustomerFaxNo}</td>
                    <td>{customer.CustomerConNo}</td>
                    {/* <td className="d-flex gap-2">
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#EditCustomer"
                        className="btn btn-sm"
                      >
                        <i className="fa text-primary fa-edit"></i>
                      </button>
                      <button className="btn btn-sm">
                        <i className="fa text-danger fa-trash"></i>
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="CreateCustomer"
        tabIndex="-1"
        aria-labelledby="CreateCustomerLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="CreateCustomerLabel">
                Create Customer
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <CreateCustomer onCustomerAdded={fetchCustomers}/>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="EditCustomer"
        tabIndex="-1"
        aria-labelledby="EditCustomerLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="EditCustomerLabel">
                Edit Customer
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <EditCustomer/>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerMaster;
