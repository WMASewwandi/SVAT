import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Base_URL from "../../Base/api";
import InvoiceReport from "./invoice-report";
import Report_URL from "../../Base/report";
import DeleteConfirm from "./delete";
import { ToastContainer } from "react-toastify";
import Catelogue from "../../Base/catelogue";

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const user = localStorage.getItem("user");
  const userObject = JSON.parse(user);
  const firstName = userObject.Name.split(" ")[0];
  const fetchInvoice = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/svatInvoice`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("fetching failed");
      }

      const data = await response.json();
      setInvoices(data.slice(0, 50));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchInvoice();
  }, []);

  useEffect(() => {
    if (invoices.length > 0) {
      const invoiceTable = document.getElementById("invoiceTable");
      if (invoiceTable) {
        new window.DataTable("#invoiceTable");
        const searchInput = document.getElementById("dt-search-0");
        if (searchInput) {
          searchInput.setAttribute("placeholder", "Search...");
        }
      }
    }
  }, [invoices]);

  function formatCurrency(value) {
    if (value == null || isNaN(value)) return '0.00';
    return parseFloat(value).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return (
    <Layout>
      <ToastContainer />
      <div className="row">
        <div className="col-12 d-flex justify-content-between">
          <h4 className="text-uppercase text-red">SVAT Invoice</h4>
          <a href="/dhl-svat/invoice/create" className="btn btn-sm btn-theme-outline sm">
            + Add New
          </a>
        </div>
        <div className="col-12 my-3">
          <div className="table-responsive">
            <table
              id="invoiceTable"
              className="display"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>SVAT ACC No</th>
                  <th>Reference No</th>
                  <th>Net Amount</th>
                  <th>HAWB</th>
                  <th>Document No</th>
                  <th>Payment Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{invoice.CustomerName}</td>
                    <td>{invoice.AccountNo}</td>
                    <td>{invoice.RefNo}</td>
                    <td>{formatCurrency(invoice.GrandTotal)}</td>
                    <td>{invoice.HAWB}</td>
                    <td>{invoice.Document}</td>
                    <td>{formatDate(invoice.PaymentDate)}</td>
                    <td>
                      {/* <a href={`${Report_URL}reportName=SVATInvoice.rpt&invoiceId=${invoice.Id}&currentUser=${firstName}`} target="_blank">
                      <i className="fa text-primary fa-print" style={{fontSize: '1.2rem'}}></i>
                    </a> */}
                      <div style={{ display: "flex", gap: "10px" }}>
                        <a href={`/dhl-svat/invoice/edit?id=${invoice.Id}`}>
                          <i className="fa text-primary fa-edit" style={{ fontSize: '1.2rem' }}></i>
                        </a>
                        {/* <InvoiceReport invoice={invoice} /> */}
                        <a href={`${Report_URL}/PrintSVATInvoiceDocuments?InitialCatalog=${Catelogue}&reportName=SVATInvoice.rpt&invoiceId=${invoice.Id}&currentUser=${firstName}`} target="_blank">
                          <i className="fa text-primary fa-print" style={{ fontSize: '1.2rem' }}></i>
                        </a>
                        <DeleteConfirm inv={invoice.Id} user={userObject} fetch={fetchInvoice} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Invoice;
