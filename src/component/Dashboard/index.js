import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Img1 from "../../assets/images/1.png";
import Img2 from "../../assets/images/2.png";
import Img3 from "../../assets/images/3.png";
import Img4 from "../../assets/images/4.png";
import Base_URL from "../../Base/api";

const Dashboard = () => {
  const [items, setItems] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [invoices, setInvoices] = useState(0);
  const [users, setUsers] = useState(0);

  const fetchLength = async (controller,setLength) => {
    try {
      const response = await fetch(`${Base_URL}/api/${controller}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("fetching failed");
      }

      const data = await response.json();
      setLength(data.length);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchLength('item',setItems);
    fetchLength('customer',setCustomers);
    fetchLength('svatInvoice',setInvoices);
    fetchLength('createUser',setUsers);
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-12 d-flex justify-content-between">
          <h4 className="text-uppercase text-red">Dashboard</h4>
        </div>
        <div className="col-12 mt-2">
          <div className="row dashboard-cards">
            <div className="col-lg-3 col-md-6 col-12 mt-2">
              <div className="card card1 text-center">
                <div className="card-header text-uppercase d-flex justify-content-between">
                  SVAT Invoices
                  <a href="" className="text-white">
                    <i className="fa fa-external-link"></i>
                  </a>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-6">
                      <img src={Img1} width={40} />
                    </div>
                    <div className="col-6 d-flex justify-content-center align-items-center">
                      <h3 className="card-title fw-600 text-white text-uppercase">
                        {invoices}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer p-1">as of today</div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mt-2">
              <div className="card card2 text-center">
                <div className="card-header text-uppercase d-flex justify-content-between">
                  Customers
                  <a href="" className="text-white">
                    <i className="fa fa-external-link"></i>
                  </a>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-6">
                      <img src={Img2} width={40} />
                    </div>
                    <div className="col-6 d-flex justify-content-center align-items-center">
                      <h3 className="card-title fw-600 text-white text-uppercase">
                        {customers}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer p-1">as of today</div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mt-2">
              <div className="card card3 text-center">
                <div className="card-header text-uppercase d-flex justify-content-between">
                  Items
                  <a href="" className="text-white">
                    <i className="fa fa-external-link"></i>
                  </a>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-6">
                      <img src={Img3} width={40} />
                    </div>
                    <div className="col-6 d-flex justify-content-center align-items-center">
                      <h3 className="card-title fw-600 text-white text-uppercase">
                        {items}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer p-1">as of today</div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mt-2">
              <div className="card card4 text-center">
                <div className="card-header text-uppercase d-flex justify-content-between">
                  Users
                  <a href="" className="text-white">
                    <i className="fa fa-external-link"></i>
                  </a>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-6">
                      <img src={Img4} width={40} />
                    </div>
                    <div className="col-6 d-flex justify-content-center align-items-center">
                      <h3 className="card-title fw-600 text-white text-uppercase">
                        {users}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer p-1">as of today</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
