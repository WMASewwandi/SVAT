import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Base_URL from "../../Base/api";
import CreateItem from "./create-item";
import { ToastContainer } from "react-toastify";
import EditItem from "./edit-item";

const ItemMaster = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

  const fetchItems = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/item`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("fetching failed");
      }

      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //get all
  useEffect(() => {
    fetchItems();
  }, []);

  //set item
  useEffect(() => {
    if (items.length > 0) {
      const itemsTable = document.getElementById("itemTable");
      if (itemsTable) {
        new window.DataTable("#itemTable");
        const searchInput = document.getElementById("dt-search-0");
        if (searchInput) {
          searchInput.setAttribute("placeholder", "Search...");
        }
      }
    }
  }, [items]);

  return (
    <Layout>
      <ToastContainer />
      <div className="row">
        <div className="col-12 d-flex justify-content-between">
          <h4 className="text-uppercase text-red">Items</h4>
          <button
            data-bs-toggle="modal"
            data-bs-target="#CreateItem"
            className="btn btn-sm btn-theme-outline sm"
          >
            + Add New
          </button>
        </div>
        <div className="col-12 my-3">
          <div className="table-responsive">
            <table id="itemTable" className="display" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Code</th>
                  <th>Description</th>
                  <th>Sap Account Code</th>
                  <th>Sap GL Code</th>
                  <th>Amount</th>
                  <th>Revenue Type</th>
                  <th>Tax Rate (%)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.ItemCode ? item.ItemCode : "-"}</td>
                    <td>{item.ItemDesc ? item.ItemDesc : "-"}</td>
                    <td>{item.SapAccCode ? item.SapAccCode : "-"}</td>
                    <td>{item.SapGlCode ? item.SapGlCode : "-"}</td>
                    <td>{item.Amount ? item.Amount : "-"}</td>
                    <td>{item.RevenueType === 1 ? "DHL Revenue" : (item.RevenueType === 2 ? "Regulatory Charge" : "")}</td>
                    <td>{item.TaxRate ?? "-"}</td>
                    <td>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#EditItem"
                        className="btn btn-sm"
                        onClick={() => setSelectedItem(item)}
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
        id="CreateItem"
        tabIndex="-1"
        aria-labelledby="CreateItemLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="CreateItemLabel">
                Create Item
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <CreateItem onItemAdded={fetchItems} />
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="EditItem"
        tabIndex="-1"
        aria-labelledby="EditItemLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="EditItemLabel">
                Edit Item
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <EditItem fetchItems={fetchItems} item={selectedItem} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemMaster;
