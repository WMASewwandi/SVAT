import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/logo.png";
import Base_URL from "../../Base/api";
import CreateReport from "../Reports/InvoiceReport";

const Layout = ({ children }) => {
  const [selectedReport, setSelectedReport] = useState();
  const [menu, setMenu] = useState([
    {
      name: "Dashboard",
      pagePath: "Dashboard",
      path: "/dhl-svat/dashboard",
      isDisabled: false,
    },
    {
      name: "Master",
      isDropdown: true,
      isDisabled: false,
      children: [
        { name: "Item Master", path: "/dhl-svat/master/items", pagePath: "ItemMaster", isDisabled: false },
        { name: "Customer Master", path: "/dhl-svat/master/customers", pagePath: "CustomerMaster", isDisabled: false },
      ],
    },
    {
      name: "SVAT",
      isDropdown: true,
      isDisabled: false,
      children: [
        { name: "Create", path: "/dhl-svat/invoice/create", pagePath: "InvoiceCreate", isDisabled: false },
        { name: "View", path: "/dhl-svat/invoice", pagePath: "Invoice", isDisabled: false },
      ],
    },
    {
      name: "Reports",
      isDropdown: true,
      isDisabled: false,
      children: [
        { name: "SVAT Invoice Summary", modalTarget: "#ViewReport", pagePath: "InvoiceSummeryReport", reportName: "InvoiceSummeryReport", isDisabled: false },
        { name: "SVAT Invoice Details", modalTarget: "#ViewReport", pagePath: "InvoiceDetailReport", reportName: "InvoiceDetailedReport", isDisabled: false },
        { name: "SVAT Invoice Cancellation", modalTarget: "#ViewReport", pagePath: "InvoiceCancellationReport", reportName: "InvoiceCancellation", isDisabled: false },
      ],
    },
    {
      name: "Authentication",
      isDropdown: true,
      isDisabled: false,
      children: [
        { name: "Users", path: "/dhl-svat/authentication/users", pagePath: "User", isDisabled: false },
        { name: "User Groups", path: "/dhl-svat/authentication/roles", pagePath: "UserGroup", isDisabled: false },
        { name: "Settings", path: "/dhl-svat/authentication/settings", pagePath: "Settings", isDisabled: false },
      ],
    },
  ]);
  const [currentDate, setCurrentDate] = useState();
  const [activeLink, setActiveLink] = useState(
    localStorage.getItem("activeLink") || "Dashboard"
  );
  const user = localStorage.getItem("user");
  const userObject = JSON.parse(user);

  const fetchRights = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/AccessRight?TypeCode=${userObject.UserType}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("fetching failed");
      }

      const data = await response.json();

      const updatedMenu = menu.map(item => {
        if (item.isDropdown && Array.isArray(item.children)) {
          const updatedChildren = item.children.map(child => ({
            ...child,
            isDisabled: !data.includes(child.pagePath),
          }));
          return { ...item, children: updatedChildren };
        } else if (item.pagePath) {
          return { ...item, isDisabled: !data.includes(item.pagePath) };
        } else {
          return { ...item, isDisabled: !data.includes(item.name) }; // fallback
        }
      });

      setMenu(updatedMenu);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchRights();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/dhl-svat/";
  };

  function updateTime() {
    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(today);
    setCurrentDate(formattedDate);
  }

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    localStorage.setItem("activeLink", linkName);
  };

  useEffect(() => {
    updateTime();
    setInterval(updateTime, 60000);
  }, []);

  if (!user) {
    window.location.href = "/dhl-svat/";
    return;
  }



  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg bg-warning">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={Logo} width="150" alt="Logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {menu.map((item, index) =>
                item.isDropdown ? (
                  <li key={index} className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {item.name}
                    </a>
                    <ul className="dropdown-menu">
                      {item.children.map((child, cIndex) => (
                        <li key={cIndex}>
                          <a
                            className={`dropdown-item ${activeLink === child.name ? "active" : ""} ${child.isDisabled ? "disabled text-muted" : ""}`}
                            href="#"
                            {...(child.modalTarget
                              ? { "data-bs-toggle": "modal", "data-bs-target": child.modalTarget }
                              : { href: child.isDisabled ? "#" : child.path })}
                            onClick={(e) => {
                              if (child.isDisabled) {
                                e.preventDefault();
                              } else {
                                if (!child.modalTarget) {
                                  handleLinkClick(child.name);
                                } else {
                                  setSelectedReport(child);
                                }
                              }
                            }}
                          >
                            {child.name}
                          </a>

                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={index} className="nav-item">
                    <a
                      className={`nav-link ${activeLink === item.name ? "active" : ""} ${item.isDisabled ? "disabled text-muted" : ""}`}
                      href={item.isDisabled ? "#" : item.path}
                      onClick={e => {
                        if (!item.isDisabled) handleLinkClick(item.name);
                        else e.preventDefault();
                      }}
                    >
                      {item.name}
                    </a>
                  </li>
                )
              )}
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">
                  {currentDate}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#" onClick={handleLogout}>
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="content mt-5 pt-4">
        <div className="container">{children}</div>
      </div>


      <div
        className="modal fade"
        id="ViewReport"
        tabIndex="-1"
        aria-labelledby="ViewReportLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="ViewReportLabel">
                {selectedReport ? selectedReport.name : "Report"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <CreateReport report={selectedReport} user={userObject}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
