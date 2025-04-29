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
              <li className="nav-item">
                <a
                  className={`nav-link ${activeLink === "Dashboard" ? "active" : ""}`}
                  href="/dhl-svat/dashboard"
                  onClick={() => handleLinkClick("Dashboard")}
                >
                  Dashboard
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="masterDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Master
                </a>
                <ul className="dropdown-menu" aria-labelledby="masterDropdown">
                  <li><a className={activeLink === "Item Master" ? "dropdown-item active" : "dropdown-item"} href="/dhl-svat/master/items" onClick={() => handleLinkClick("Item Master")}>Item Master</a></li>
                  <li><a className={activeLink === "Customer Master" ? "dropdown-item active" : "dropdown-item"} href="/dhl-svat/master/customers" onClick={() => handleLinkClick("Customer Master")}>Customer Master</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">                
                <a className="nav-link dropdown-toggle" href="#" id="masterDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  SVAT
                </a>
                <ul className="dropdown-menu" aria-labelledby="masterDropdown">
                  <li><a className={activeLink === "Create" ? "dropdown-item active" : "dropdown-item"} href="/dhl-svat/invoice/create" onClick={() => handleLinkClick("Create")}>Create</a></li>
                  <li><a className={activeLink === "View" ? "dropdown-item active" : "dropdown-item"} href="/dhl-svat/invoice" onClick={() => handleLinkClick("View")}>View</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="reportsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Reports
                </a>
                <ul className="dropdown-menu" aria-labelledby="reportsDropdown">
                  <li><a className={activeLink === "Customers Report" ? "dropdown-item active" : "dropdown-item"} href="/dhl-svat/report/customer" onClick={() => handleLinkClick("Customers Report")}>
                    Customers Report</a></li>
                  <li><a className={activeLink === "Bulk Invoice" ? "dropdown-item active" : "dropdown-item"} href="/dhl-svat/report/bulk-invoice" onClick={() => handleLinkClick("Bulk Invoice")}>
                    Bulk Invoice Print</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="authDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Authentication
                </a>
                <ul className="dropdown-menu" aria-labelledby="authDropdown">
                  <li><a className={activeLink === "Users" ? "dropdown-item active" : "dropdown-item"} href="/dhl-svat/authentication/users" onClick={() => handleLinkClick("Users")}>
                    Users</a></li>
                  <li><a className={activeLink === "Roles" ? "dropdown-item active" : "dropdown-item"} href="/dhl-svat/authentication/roles" onClick={() => handleLinkClick("Roles")}>
                    Roles</a></li>
                  {/* <li><a className={activeLink === "Settings" ? "dropdown-item active" : "dropdown-item"} href="/dhl-svat/authentication/settings" onClick={() => handleLinkClick("Settings")}>
                    Settings</a></li> */}
                </ul>
              </li>
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
    </div>
  );
};

export default Layout;
