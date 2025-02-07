import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Base_URL from "../../Base/api";
import InvoiceReport from "./invoice-report";

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
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

  
  return (
    <Layout>
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
                  <th>Reference No</th>
                  <th>Net Amount</th>
                  <th>Document No</th>
                  <th>Payment Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {invoices.map((invoice, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{invoice.CustomerName}</td>
                  <td>{invoice.RefNo}</td>
                  <td>{invoice.GrandTotal}</td>
                  <td>{invoice.Document}</td>
                  <td>{invoice.PaymentDate}</td>
                  <td>
                    <InvoiceReport invoice={invoice}/>
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
