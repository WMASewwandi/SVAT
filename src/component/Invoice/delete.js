import React, { useEffect, useState } from "react";
import Base_URL from "../../Base/api";
import { toast } from "react-toastify";

const DeleteConfirm = ({ id, user, fetch: refetch }) => {
  const [hasDeleteAccess, setHasDeleteAccess] = useState(false);

  const fetchRights = async () => {
    try {
      const res = await fetch(`${Base_URL}/api/AccessRight?TypeCode=${user.UserType}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Fetching access rights failed");
      }

      const data = await res.json();
      const allowed = Array.isArray(data) && data.includes("InvoiceDelete");
      setHasDeleteAccess(allowed);
    } catch (error) {
      console.error("Access Rights Error:", error);
    }
  };

  useEffect(() => {
    fetchRights();
  }, []);

  const handleConfirm = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/svatInvoice?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });

      if (!response.ok) {
        throw new Error("Delete request failed");
      }

      const data = await response.json();
      if (data.Message === "Invoice Deleted successfully") {
        toast.success(data.Message);
        document.getElementById("delete-modal-close").click();
        refetch();
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <>
      {hasDeleteAccess && (
        <a type="button" data-bs-target="#deleteModal" data-bs-toggle="modal">
          <i className="fa text-danger fa-trash" style={{ fontSize: "1.2rem" }}></i>
        </a>
      )}

      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteModalLabel">
                Confirm Delete
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this item?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="delete-modal-close"
              >
                No
              </button>
              <button type="button" className="btn btn-danger" onClick={handleConfirm}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirm;
