import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/logo.png";


const Layout = ({ children }) => {
  const [currentDate, setCurrentDate] = useState();
  const [activeLink, setActiveLink] = useState(
    localStorage.getItem("activeLink") || "Dashboard"
  );
  const user = localStorage.getItem("user");
  const userObject = JSON.parse(user);

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
  

  const handleLinkClick = (linkName, parentMenu) => {
    setActiveLink(linkName);
    localStorage.setItem("activeLink", linkName);
    if (parentMenu) {
      localStorage.setItem("activeParentMenu", parentMenu);
    }
  };

  useEffect(() => {
    const storedActiveLink = localStorage.getItem("activeLink");
    const storedActiveParentMenu = localStorage.getItem("activeParentMenu");

    if (storedActiveLink) {
      setActiveLink(storedActiveLink);
    }

    if (storedActiveParentMenu) {
      const parentMenu = document.getElementById(storedActiveParentMenu);
      if (parentMenu) {
        parentMenu.classList.add("show");
      }
    }
    updateTime();
  setInterval(updateTime, 60000);
  }, []);

  if (!user) {
    window.location.href = "/dhl-svat/";
    return;
  }

  return (
    <div>
      <div id="sidebar">
        <a className="navbar-brand" href="#">
          <img src={Logo} width="200" alt="Logo" />
        </a>
        <ul>
          <li>
            <a
              className={activeLink === "Dashboard" ? "active" : ""}
              href="/dhl-svat/dashboard"
              onClick={() => handleLinkClick("Dashboard")}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#masterMenu"
              data-bs-toggle="collapse"
              aria-expanded="false"
              className={`dropdown-toggle d-flex align-items-center justify-content-between`}
              onClick={() => handleLinkClick("Master", "masterMenu")}
            >
              Master
            </a>
            <ul className="collapse list-unstyled" id="masterMenu">
              <li>
                <a
                  className={activeLink === "Item Master" ? "active" : ""}
                  href="/dhl-svat/master/items"
                  onClick={() => handleLinkClick("Item Master", "masterMenu")}
                >
                  Item Master
                </a>
              </li>
              <li>
                <a
                  className={activeLink === "Customer Master" ? "active" : ""}
                  href="/dhl-svat/master/customers"
                  onClick={() =>
                    handleLinkClick("Customer Master", "masterMenu")
                  }
                >
                  Customer Master
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              className={activeLink === "Invoice" ? "active" : ""}
              href="/dhl-svat/invoice"
              onClick={() => handleLinkClick("Invoice")}
            >
              SVAT Invoice
            </a>
          </li>
          <li>
            <a
              href="#reportsMenu"
              data-bs-toggle="collapse"
              aria-expanded="false"
              className={`dropdown-toggle d-flex align-items-center justify-content-between`}
              onClick={() => handleLinkClick("Reports", "reportsMenu")}
            >
              Reports
            </a>
            <ul className="collapse list-unstyled" id="reportsMenu">
              <li>
                <a
                  className={activeLink === "Customers Report" ? "active" : ""}
                  href="/dhl-svat/report/customer"
                  onClick={() =>
                    handleLinkClick("Customers Report", "reportsMenu")
                  }
                >
                  Customers
                </a>
              </li>
              <li>
                <a
                  className={activeLink === "Bulk Invoice" ? "active" : ""}
                  href="/dhl-svat/report/bulk-invoice"
                  onClick={() => handleLinkClick("Bulk Invoice", "reportsMenu")}
                >
                  Bulk Invoice Print
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#authenticationMenu"
              data-bs-toggle="collapse"
              aria-expanded="false"
              className={`dropdown-toggle d-flex align-items-center justify-content-between`}
              onClick={() =>
                handleLinkClick("Authentication", "authenticationMenu")
              }
            >
              Authentication
            </a>
            <ul className="collapse list-unstyled" id="authenticationMenu">
              <li>
                <a
                  className={activeLink === "Users" ? "active" : ""}
                  href="/dhl-svat/authentication/users"
                  onClick={() => handleLinkClick("Users", "authenticationMenu")}
                >
                  Users
                </a>
              </li>
              <li>
                <a
                  className={activeLink === "Roles" ? "active" : ""}
                  href="/dhl-svat/authentication/roles"
                  onClick={() => handleLinkClick("Roles", "authenticationMenu")}
                >
                  Roles
                </a>
              </li>
              <li>
                <a
                  className={activeLink === "Settings" ? "active" : ""}
                  href="/dhl-svat/authentication/settings"
                  onClick={() => handleLinkClick("Settings", "authenticationMenu")}
                >
                  Settings
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <nav className="navbar fixed-top navbar-expand-lg" id="navbar">
        <div className="container-fluid">
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
          <h6 className="text-white">
            <span className="text-warning">Welcome, </span>
            {userObject.Name}
          </h6>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  {currentDate}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={handleLogout} href="#">
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="content">
        <div className="container">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
