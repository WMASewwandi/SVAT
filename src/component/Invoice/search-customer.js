import React, { useEffect, useRef, useState } from "react";

const SearchCustomer = ({ customers,onSelectCustomer }) => {
  const inputRef = useRef(null);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleOpen = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

    useEffect(() => {
      setFilteredCustomers(customers);
    }, [customers]);

  const handleSearch = () => {
    const ibsCode = document.getElementById("ibsCode").value.toLowerCase();
    const sapCode = document.getElementById("sapCode").value.toLowerCase();
    const customerName = document
      .getElementById("customerName")
      .value.toLowerCase();
    const address = document.getElementById("address").value.toLowerCase();
    const vatNo = document.getElementById("vatNo").value.toLowerCase();
    const svatNo = document.getElementById("svatNo").value.toLowerCase();

    const filtered = customers.filter(
      (customer) =>
        (ibsCode === "" ||
          customer.CustomerCode.toLowerCase().includes(ibsCode)) &&
        (sapCode === "" ||
          customer.CustomerSapNo.toLowerCase().includes(sapCode)) &&
        (customerName === "" ||
          customer.CustomerName.toLowerCase().includes(customerName)) &&
        (address === "" ||
          customer.CustomerAdd1.toLowerCase().includes(address)) &&
        (vatNo === "" ||
          customer.CustomerVatNo.toLowerCase().includes(vatNo)) &&
        (svatNo === "" ||
          customer.CustomerSVatNo.toLowerCase().includes(svatNo))
    );

    setFilteredCustomers(filtered);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < filteredCustomers.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter") {      
      if (selectedIndex === -1){
        handleSearch();
      }else{
        handleSelect();
        document.getElementsByClassName("btn-close")[0].click();
      }
    }
  };

  const handleSelect = () => {
    // alert(selectedIndex);
    if (selectedIndex !== -1) {
      const customer = filteredCustomers[selectedIndex];
      onSelectCustomer(customer); 
    }
  };
  return (
    <>
      <button
        type="button"
        data-bs-target="#customerSearchModal"
        data-bs-toggle="modal"
        onClick={handleOpen}
        className="btn btn-success btn-sm"
      >
        <i className="fa fa-search"></i>
      </button>

      <div
        className="modal fade"
        id="customerSearchModal"
        tabIndex="-1"
        aria-labelledby="customerSearchModalLabel"
        aria-hidden="true"
        onKeyDown={handleKeyDown}
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="customerSearchModalLabel">
                Customer Finder
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"

              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="row mt-1">
                    <div className="col-4">
                      <label>IBS Code</label>
                    </div>
                    <div className="col-8">
                      <input
                        id="ibsCode"
                        type="text"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-4">
                      <label>SAP Code</label>
                    </div>
                    <div className="col-8">
                      <input
                        id="sapCode"
                        type="text"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-4">
                      <label>Customer Name</label>
                    </div>
                    <div className="col-8">
                      <input
                        id="customerName"
                        type="text"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-4">
                      <label>Address 1</label>
                    </div>
                    <div className="col-8">
                      <input
                        id="address"
                        type="text"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="row mt-1">
                    <div className="col-4">
                      <label>VAT No</label>
                    </div>
                    <div className="col-8">
                      <input
                        id="vatNo"
                        type="text"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-4">
                      <label>SVAT No</label>
                    </div>
                    <div className="col-8">
                      <input
                        id="svatNo"
                        type="text"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-1 d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() => handleSearch()}
                  >
                    Search
                  </button>
                </div>
                <div className="col-12 mt-2 mb-2">
                  <div className="table-responsive">
                    <table className="table table-sm table-bordered table-striped">
                      <thead>
                        <tr className="table-dark">
                          <th className="p-2">IBS Code</th>
                          <th className="p-2">SAP Code</th>
                          <th className="p-2">Name</th>
                          <th className="p-2">VAT No</th>
                          <th className="p-2">SVAT No</th>
                          <th className="p-2">Address 1</th>
                          <th className="p-2">Allow Edit</th>
                          <th className="p-2">Inactive</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCustomers.length === 0 ? (
                          <tr>
                            <td className="p-2" colSpan={6}>
                              No Customers Available
                            </td>
                          </tr>
                        ) : (
                          filteredCustomers.map((customer, index) => (
                            <tr
                              key={index}
                              className={
                                selectedIndex === index ? "table-danger" : ""
                              }
                            >
                              <td className="p-2">{customer.CustomerCode}</td>
                              <td className="p-2">{customer.CustomerSapNo}</td>
                              <td className="p-2">{customer.CustomerName}</td>
                              <td className="p-2">{customer.CustomerVatNo}</td>
                              <td className="p-2">{customer.CustomerSVatNo}</td>
                              <td className="p-2">{customer.CustomerAdd1}</td>
                              <td className="p-2">
                                <input
                                  type="checkbox"
                                  disabled
                                  checked={customer.AllowEditDetails === 1}
                                />
                              </td>
                              <td className="p-2">
                                <input
                                  type="checkbox"
                                  disabled
                                  checked={customer.Inactive !== 1}
                                />
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={handleSelect}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCustomer;
