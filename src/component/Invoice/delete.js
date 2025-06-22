// DeleteConfirm.jsx
import React, { useEffect, useState } from "react";
import Base_URL from "../../Base/api";
import { toast } from "react-toastify";

const DeleteConfirm = ({ inv, user, fetch: refetch }) => {
  const [hasDeleteAccess, setHasDeleteAccess] = useState(false);
  const [reason, setReason] = useState("");
  const modalId = `deleteModal-${inv}`;
  const closeBtnId = `delete-close-${inv}`;

  useEffect(() => {
    const fetchRights = async () => {
      try {
        const res = await fetch(
          `${Base_URL}/api/AccessRight?TypeCode=${user.UserType}`
        );
        const data = await res.json();
        setHasDeleteAccess(Array.isArray(data) && data.includes("InvoiceDelete"));
      } catch (e) {
        console.error(e);
      }
    };
    fetchRights();
  }, [user.UserType]);

  const handleConfirm = async () => {
    if (!reason) {
      toast.warning("Please Enter Reason");
      return;
    }
    try {
      const response = await fetch(
        `${Base_URL}/api/svatInvoice?id=${inv}&reason=${reason}&user=${user.Name}`,
        { method: "PUT", headers: { "Content-Type": "application/json" } }
      );
      const data = await response.json();
      if (data.Message === "Invoice Deleted successfully") {
        toast.success(data.Message);
        document.getElementById(closeBtnId).click();
        refetch();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {hasDeleteAccess && (
        <a data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
          <i className="fa text-danger fa-trash" style={{ fontSize: "1.2rem" }} />
        </a>
      )}

      <div className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Confirm Delete</h1>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              Are you sure you want to delete this item?
              <div className="my-2">
                <input
                  className="form-control"
                  placeholder="Reject Reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                id={closeBtnId}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button className="btn btn-danger" onClick={handleConfirm}>
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
