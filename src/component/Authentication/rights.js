import React, { useEffect, useState } from "react";
import Base_URL from "../../Base/api";
import { toast } from "react-toastify";



const UserRights = ({ role, fetchItems }) => {
  const screenRights = [
    {
      title: "Dashboard",
      items: [
        { typeCode: role.TypeCode, pagePath: "Dashboard" },
      ],
    },
    {
      title: "Master",
      items: [
        { typeCode: role.TypeCode, pagePath: "ItemMaster" },
        { typeCode: role.TypeCode, pagePath: "CustomerMaster" },
      ],
    },
    {
      title: "SVAT Invoice",
      items: [
        { typeCode: role.TypeCode, pagePath: "Invoice" },
        { typeCode: role.TypeCode, pagePath: "InvoiceCreate" },
        { typeCode: role.TypeCode, pagePath: "InvoiceDelete" },
      ],
    },
    {
      title: "Reports",
      items: [
        { typeCode: role.TypeCode, pagePath: "InvoiceSummeryReport" },
        { typeCode: role.TypeCode, pagePath: "InvoiceDetailReport" },
        { typeCode: role.TypeCode, pagePath: "InvoiceCancellationReport" },
      ],
    },
    {
      title: "Authentication",
      items: [
        { typeCode: role.TypeCode, pagePath: "User" },
        { typeCode: role.TypeCode, pagePath: "UserGroup" },
      ],
    },
  ];

  const [selectedRights, setSelectedRights] = useState(() => {
    const initial = {};
    screenRights.forEach((section) => {
      section.items.forEach((item) => {
        initial[item.pagePath] = false;
      });
    });
    return initial;
  });

  const handleCheckboxChange = (path) => {
    setSelectedRights((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selected = [];

    screenRights.forEach((section) => {
      section.items.forEach((item) => {
        selected.push({
          TypeCode: item.typeCode,
          PagePath: item.pagePath,
          AccessRight: selectedRights[item.pagePath] ? "true" : "false",
        });
      });
    });

    try {
      const response = await fetch(`${Base_URL}/api/ScreenRight`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selected),
      });

      if (!response.ok) {
        throw new Error("fetching failed");
      }

      const data = await response.json();
      if (data.Message === "Access Rights Saved Successfully") {
        toast.success(data.Message);
        document.getElementById("close-modal-user-r").click();
        fetchItems();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(data.Message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchRights = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/AccessRight?TypeCode=${role.TypeCode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("fetching failed");
      }

      const data = await response.json();
      const updatedRights = {};
      screenRights.forEach((section) => {
        section.items.forEach((item) => {
          updatedRights[item.pagePath] = data.includes(item.pagePath);
        });
      });

      setSelectedRights(updatedRights);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (role) {
      fetchRights();
    }
  }, [role]);


  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-12">
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-12">
                <h6 className="fw-bold text-uppercase text-danger">
                  Screen Rights
                </h6>
              </div>

              {screenRights.map((section, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-12">
                  <h6 className="fw-bold text-uppercase">{section.title}</h6>
                  <ul className="list-unstyled">
                    {section.items.map((item, i) => (
                      <li key={i}>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedRights[item.pagePath]}
                            onChange={() => handleCheckboxChange(item.pagePath)}
                          />
                          <label className="form-check-label">
                            {item.pagePath}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group d-flex justify-content-between gap-3 mt-3">
            <button
              id="close-modal-user-r"
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
