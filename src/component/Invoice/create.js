import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Base_URL from "../../Base/api";
import { toast, ToastContainer } from "react-toastify";

const CreateSVATInvoice = () => {
  const [items, setItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermCustomer, setSearchTermCustomer] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isCustomerDropdownVisible, setIsCustomerDropdownVisible] =
    useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  //values
  const [refNo, setRefNo] = useState(null);
  const [accountant, setAccountant] = useState("ACCOUNTANT");
  const [docNo, setDocNo] = useState(null);
  const [hawbNo, setHawbNo] = useState(null);
  const [date, setDate] = useState(null);
  const [paymentDate, setPaymentDate] = useState(null);
  const [origin, setOrigin] = useState(0);
  const [pieces, setPieces] = useState(0);
  const [destination, setDestination] = useState(0);
  const [weight, setWeight] = useState(0);
  const [content, setContent] = useState(0);
  const [assessedValue, setAssessedValue] = useState(0);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [cusdecNo, setCusdecNo] = useState(0);

  const handleSelectDate = (date) => {
    setDate(date);

    const selectedDate = new Date(date);
    const seventhDay = new Date(selectedDate);
    seventhDay.setDate(selectedDate.getDate() + 7);
    const formattedDate = seventhDay.toISOString().split("T")[0];
    setPaymentDate(formattedDate);
  };
  useEffect(() => {
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

    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${Base_URL}/api/customer`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("fetching failed");
        }

        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchItems();
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      return;
    }
    setIsDropdownVisible(true);
    setFilteredItems(
      items.filter((item) =>
        item.ItemCode.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, items]);

  useEffect(() => {
    if (searchTermCustomer === "") {
      return;
    }
    setIsCustomerDropdownVisible(true);
    setFilteredCustomers(
      customers.filter((customer) =>
        customer.CustomerCode.toLowerCase().includes(
          searchTermCustomer.toLowerCase()
        )
      )
    );
  }, [searchTermCustomer, customers]);

  const handleSelectItem = (item) => {
    setIsDropdownVisible(false);
    setSearchTerm("");
    if (!hawbNo) {
      toast.info("Please Enter HAWB No");
      return;
    }
    const itemToAdd = items.find((i) => i.ItemCode === item.ItemCode);
    if (
      itemToAdd &&
      !addedItems.some((i) => i.ItemCode === itemToAdd.ItemCode)
    ) {
      setAddedItems([...addedItems, itemToAdd]);
    } else {
      toast.error("Item Already Added");
    }
  };

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsCustomerDropdownVisible(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredItems.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && filteredItems[highlightedIndex]) {
      handleSelectItem(filteredItems[highlightedIndex]);
      e.preventDefault();
    }
  };

  const handleKeyDownCustomer = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredCustomers.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && filteredCustomers[highlightedIndex]) {
      handleSelectCustomer(filteredCustomers[highlightedIndex]);
      setIsCustomerDropdownVisible(false);
      e.preventDefault();
    }
  };

  const handleItemInputChange = (index, field, value) => {
    const updatedItems = [...addedItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setAddedItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const total = addedItems.reduce((sum, item) => {
      const amount = parseFloat(item.Amount) || 0;
      return sum + amount;
    }, 0);

    const suspendedSVATTotal = addedItems.reduce((sumsuspendedSVAT, item) => {
      const suspendedSVATamount = parseFloat(item.TaxBase) || 0;
      return sumsuspendedSVAT + suspendedSVATamount;
    }, 0);

    if (!selectedCustomer || Object.keys(selectedCustomer).length === 0) {
      toast.info("Please Select Customer");
      return;
    }

    if (addedItems.length === 0) {
      toast.info("Please Add Items");
      return;
    }

    const postData = {
      AccountNo: selectedCustomer.CustomerCode,
      InvoiceNo: "",
      CustomerName: selectedCustomer.CustomerName,
      CustomerCode: selectedCustomer.CustomerCode,
      Address1: selectedCustomer.CustomerAdd1,
      Address2: selectedCustomer.CustomerAdd2,
      Address3: selectedCustomer.CustomerAdd3,
      ContactNo: selectedCustomer.ContactNo,
      RefferenceNo: refNo,
      Accountant: accountant,
      DocumentNo: docNo,
      HAWBNo: hawbNo,
      InvoiceDate: date,
      PaymentDate: paymentDate,
      Origin: origin,
      Pieces: pieces,
      Content: content,
      ArrivalDate: arrivalDate,
      Destination: destination,
      Weight: weight,
      AssesedValue: assessedValue,
      CusdecNo: cusdecNo,
      GrandTotal: total,
      SuspendedSVATCharges: suspendedSVATTotal,
      InvoiceItems: addedItems.map((item) => ({
        ItemId: 2,
        ItemCode: item.ItemCode,
        ItemDesc: item.ItemDesc,
        Tax: "",
        TaxRate: item.TaxRate,
        TaxBase: item.TaxBase,
        Amount: item.Amount,
      })),
    };

    try {
      const response = await fetch(`${Base_URL}/api/svatInvoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("fetching failed");
      }

      const data = await response.json();
      if(data.Message === "Invoice saved successfully.") {
        toast.success(data.Message);
        setDate("");
        setArrivalDate("");
        setPaymentDate("");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const calculateGrandTotal = () => {
    return addedItems.reduce((sum, item) => {
      const amount = parseFloat(item.Amount) || 0;
      return sum + amount;
    }, 0);
  };

  const calculateSuspendedSVATTotal = () => {
    return addedItems.reduce((sum, item) => {
      const amount = parseFloat(item.TaxBase) || 0;
      return sum + amount;
    }, 0);
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="row">
        <div className="col-12 d-flex justify-content-between">
          <h4 className="text-uppercase text-red">Create SVAT Invoice</h4>
          <a href="/dhl-svat/invoice" className="btn btn-sm btn-theme-outline sm">
            Go Back
          </a>
        </div>
        <div className="col-12 my-3">
          <form action="/dhl-svat/invoice" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 mb-3">
                <h6 className="text-dark fw-bold">General</h6>
              </div>
              <div className="col-lg-6 col-12">
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-secondary">Account Number</label>
                    </div>
                    <div className="col-8 position-relative">
                      <input
                        className="form-control form-control-sm"
                        placeholder="Search Customer by Code"
                        value={
                          selectedCustomer
                            ? selectedCustomer.CustomerCode
                            : searchTermCustomer
                        }
                        onChange={(e) => setSearchTermCustomer(e.target.value)}
                        onFocus={() =>
                          searchTermCustomer &&
                          setIsCustomerDropdownVisible(true)
                        }
                        onKeyDown={handleKeyDownCustomer}
                      />

                      {isCustomerDropdownVisible &&
                        filteredCustomers.length > 0 && (
                          <ul
                            className="dropdown-menu w-100 show position-absolute"
                            style={{ maxHeight: "200px", overflowY: "auto" }}
                          >
                            {filteredCustomers.map((customer, index) => (
                              <li
                                key={index}
                                className={`dropdown-item ${
                                  index === highlightedIndex ? "active" : ""
                                }`}
                                onClick={() => handleSelectCustomer(customer)}
                              >
                                {customer.CustomerCode} -{" "}
                                {customer.CustomerName}
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                  </div>
                </div>
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-secondary">Customer Name</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        readOnly
                        value={
                          selectedCustomer ? selectedCustomer.CustomerName : ""
                        }
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-secondary">Address 1</label>
                    </div>
                    <div className="col-8">
                      <input
                        value={
                          selectedCustomer ? selectedCustomer.CustomerAdd1 : ""
                        }
                        type="text"
                        readOnly
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-secondary">Address 2</label>
                    </div>
                    <div className="col-8">
                      <input
                        value={
                          selectedCustomer ? selectedCustomer.CustomerAdd2 : ""
                        }
                        readOnly
                        type="text"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-secondary">Address 3</label>
                    </div>
                    <div className="col-8">
                      <input
                        value={
                          selectedCustomer ? selectedCustomer.CustomerAdd3 : ""
                        }
                        type="text"
                        readOnly
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-secondary">Contact No</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        readOnly
                        value={
                          selectedCustomer ? selectedCustomer.CustomerConNo : ""
                        }
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-secondary">Reference Number</label>
                    </div>
                    <div className="col-8">
                      <input
                        value={refNo}
                        type="text"
                        className="form-control form-control-sm"
                        onChange={(e) => setRefNo(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-secondary">Accountant</label>
                    </div>
                    <div className="col-8">
                      <input
                        value={accountant}
                        onChange={(e) => setAccountant(e.target.value)}
                        type="text"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-secondary">Document No</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        value={docNo}
                        onChange={(e) => setDocNo(e.target.value)}
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-secondary">HAWB No</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        value={hawbNo}
                        onChange={(e) => setHawbNo(e.target.value)}
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-secondary">Date</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => handleSelectDate(e.target.value)}
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-secondary">Payment Date</label>
                    </div>
                    <div className="col-8">
                      <input
                        required
                        value={paymentDate}
                        type="date"
                        readOnly
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 my-3">
                <h6 className="text-dark fw-bold">Shipment Details</h6>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-secondary">Origin</label>
                    </div>
                    <div className="col-8">
                      <input
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        type="text"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-secondary">Destination</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-secondary">Peices</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={pieces}
                        onChange={(e) => setPieces(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-secondary">Weight</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-secondary">Content</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-secondary">Assesed Value</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={assessedValue}
                        onChange={(e) => setAssessedValue(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-secondary">Arrival Date</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="date"
                        required
                        className="form-control form-control-sm"
                        value={arrivalDate}
                        onChange={(e) => setArrivalDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-secondary">Cusdec No</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={cusdecNo}
                        onChange={(e) => setCusdecNo(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 my-2 position-relative">
                <input
                  className="form-control"
                  placeholder="Search Items..."
                  style={{ position: "relative!important" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => searchTerm && setIsDropdownVisible(true)}
                  onKeyDown={handleKeyDown}
                />
                {isDropdownVisible && filteredItems.length > 0 && (
                  <ul
                    className="dropdown-menu show w-50 position-absolute"
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {filteredItems.map((item, index) => (
                      <li
                        key={index}
                        className={`dropdown-item ${
                          index === highlightedIndex ? "active" : ""
                        }`}
                        onClick={() => handleSelectItem(item)}
                      >
                        {item.ItemCode} - {item.description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table table-sm table-bordered">
                    <thead>
                      <tr>
                        <th className="p-2"></th>
                        <th className="p-2">#</th>
                        <th className="p-2">Item Code</th>
                        <th className="p-2">Description</th>
                        <th className="p-2">Tax</th>
                        <th className="p-2">Tax Rate</th>
                        <th className="p-2">Tax Base</th>
                        <th className="p-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {addedItems.map((item, index) => (
                        <tr key={index}>
                          <td className="p-1">
                            <a
                              href="#"
                              onClick={() =>
                                setAddedItems(
                                  addedItems.filter(
                                    (i) => i.ItemCode !== item.ItemCode
                                  )
                                )
                              }
                            >
                              <i className="fa fa-trash"></i>
                            </a>
                          </td>
                          <td className="p-1">{index + 1}</td>
                          <td className="p-1">{item.ItemCode}</td>
                          <td className="p-1">{item.ItemDesc}</td>
                          <td className="p-1">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={item.Tax ?? 0}
                              readOnly
                            />
                          </td>
                          <td className="p-1">
                            <div className="input-group input-group-sm">
                              <input
                                type="text"
                                value={item.TaxRate ?? 0}
                                className="form-control"
                                readOnly
                              />
                              <span className="input-group-text">%</span>
                            </div>
                          </td>
                          <td className="p-1">
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={item.TaxBase ?? 0}
                              onChange={(e) =>
                                handleItemInputChange(
                                  index,
                                  "TaxBase",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="p-1">
                            <input
                              value={item.Amount}
                              type="number"
                              className="form-control form-control-sm"
                              onChange={(e) =>
                                handleItemInputChange(
                                  index,
                                  "Amount",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th className="p-1 text-end" colSpan="7">
                          Grand Total
                        </th>
                        <th className="p-1">
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            value={calculateGrandTotal()}
                            readOnly
                          />
                        </th>
                      </tr>
                      <tr>
                        <th className="p-1 text-end" colSpan="7">
                          Suspended SVAT Charges
                        </th>
                        <th className="p-1">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            readOnly
                            value={calculateSuspendedSVATTotal()}
                          />
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div className="col-12 d-flex gap-3 justify-content-end my-2">
                <button type="submit" className="btn btn-sm btn-theme">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateSVATInvoice;
