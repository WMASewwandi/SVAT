import React, { useEffect, useRef, useState } from "react";
import Layout from "../Layout";
import Base_URL from "../../Base/api";
import { toast, ToastContainer } from "react-toastify";
import SearchCustomer from "./search-customer";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EditSVATInvoice = () => {
  const query = useQuery();
  const id = query.get("id");

  const inputRef = useRef(null);
  const lastAmountRef = useRef(null);
  const [settingValue, setSettingValue] = useState();
  const today1 = new Date();
  today1.setDate(today1.getDate() + 7);
  const formattedDueDate = today1.toISOString().split("T")[0];
  const accNoInputRef = useRef(null);
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
  const [date, setDate] = useState();
  const [paymentDate, setPaymentDate] = useState(formattedDueDate);
  const [origin, setOrigin] = useState(0);
  const [pieces, setPieces] = useState(0);
  const [destination, setDestination] = useState("CMB");
  const [weight, setWeight] = useState(0);
  const [content, setContent] = useState(0);
  const [assessedValue, setAssessedValue] = useState(0);
  const [arrivalDate, setArrivalDate] = useState();
  const [cusdecNo, setCusdecNo] = useState(0);
  const [tabPressed, setTabPressed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invoice, setInvoice] = useState();
  const autoNumRef = useRef(null);

  const formatToSLDate = (utcDateString) => {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Colombo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    return formatter.format(new Date(utcDateString));
  };




  const fetchInvoiceById = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/svatInvoice?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("fetching failed");
      }

      const data = await response.json();
      var inv = data[0];
      var customer = {
        CustomerSVatNo: inv.AccountNo,
        CustomerName: inv.CustomerName,
        CustomerCode: inv.AccountNo,
        CustomerAdd1: inv.Address1,
        CustomerAdd2: inv.Address2,
        CustomerAdd3: inv.Address1,
        ContactNo: inv.ContactNo
      };
      setSelectedCustomer(customer);
      setRefNo(inv.RefNo);
      setHawbNo(inv.HAWB);
      setDocNo(inv.InvoiceNo);
      setAccountant(inv.Accountant);
      setOrigin(inv.Origin);
      setDestination(inv.Destination);
      setPieces(inv.Pieces);
      setWeight(inv.Weight);
      setContent(inv.Content);
      setAssessedValue(inv.AssessedValue);
      setCusdecNo(inv.CusdecNo);
      setAddedItems(inv.InvoiceItems);
      setDate(formatToSLDate(inv.InvoiceDate));
      setPaymentDate(formatToSLDate(inv.PaymentDate))
      setArrivalDate(formatToSLDate(inv.ArrivalDate))
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchInvoiceById();
  }, []);

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
    const fetchSetting = async () => {
      try {
        const response = await fetch(`${Base_URL}/api/Settings?name=SVATPercentage`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("fetching failed");
        }

        const data = await response.json();
        const value = data[0];
        setSettingValue(value.Value);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSetting();
    fetchItems();
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      return;
    }

    setIsDropdownVisible(true);
    setFilteredItems(
      items
        .filter((item) => item.ItemCode !== "SSCL")
        .filter((item) =>
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
    if (!itemToAdd) return;

    const alreadyExists = addedItems.some((i) => i.ItemCode === itemToAdd.ItemCode);
    if (alreadyExists) {
      toast.error("Item Already Added");
      return;
    }

    const x = items.find((i) => i.ItemCode === "SSCL");
    const xTaxRate = parseFloat(x?.TaxRate ?? 0);
    const taxRate = parseFloat(itemToAdd.TaxRate ?? 0);
    let updatedItem = { ...itemToAdd };

    const getPercentAmount = (amount, rate) => Math.round(amount * (rate / 100));

    const dependentAmount = (code, strict = true) => {
      const ref = addedItems.find((i) => i.ItemCode === code);
      if (!ref) {
        if (strict) {
          toast.error(`Please add ${code} item first`);
          return null;
        }
        return 0;
      }
      return parseFloat(ref.Amount ?? 0);
    };

    const dependentRate = (code) => {
      const ref = addedItems.find((i) => i.ItemCode === code);
      if (!ref) {
        return 0;
      }
      return parseFloat(ref.TaxBase ?? 0);
    };

    const calculateTaxBase = (base, rate) => {
      const y = base + ((base + 1) * rate / 100);
      const tax = Math.round((Math.round(y)) * taxRate / 100);
      return { amount: base, taxBase: tax };
    };

    switch (itemToAdd.ItemCode) {
      case "PAP":
      case "HVC":
      case "BOS": {
        const baseAmt = parseFloat(itemToAdd.Amount ?? 0);
        const { amount, taxBase } = calculateTaxBase(baseAmt, xTaxRate);
        updatedItem.Amount = amount;
        updatedItem.TaxBase = taxBase;
        break;
      }

      case "SDO": {
        const papAmt = dependentAmount("PAP");
        if (papAmt == null) return;
        updatedItem.Amount = getPercentAmount(papAmt, xTaxRate);
        break;
      }

      case "VDO": {
        updatedItem.Amount = dependentRate("PAP");
        break;
      }

      case "SHA": {
        const hvcAmt = dependentAmount("HVC");
        if (hvcAmt == null) return;
        updatedItem.Amount = getPercentAmount(hvcAmt, xTaxRate);
        break;
      }

      case "VHA": {
        updatedItem.Amount = dependentRate("HVC");
        break;
      }

      case "SSC": {
        const bosAmt = dependentAmount("BOS");
        if (bosAmt == null) return;
        updatedItem.Amount = getPercentAmount(bosAmt, xTaxRate);
        break;
      }

      case "VSC": {
        updatedItem.Amount = dependentRate("BOS");
        break;
      }
    }
    const newAddedItems = [...addedItems, updatedItem];

    const updateDependentItem = (code, baseCode) => {
      const baseItem = newAddedItems.find((i) => i.ItemCode === baseCode);
      const targetIndex = newAddedItems.findIndex((i) => i.ItemCode === code);
      if (targetIndex !== -1) {
        const baseAmount = parseFloat(baseItem?.TaxBase ?? 0);
        newAddedItems[targetIndex] = {
          ...newAddedItems[targetIndex],
          Amount: baseAmount,
        };
      }
    };

    switch (itemToAdd.ItemCode) {
      case "PAP":
        updateDependentItem("VDO", "PAP");
        break;
      case "HVC":
        updateDependentItem("VHA", "HVC");
        break;
      case "BOS":
        updateDependentItem("VSC", "BOS");
        break;
    }

    setAddedItems(newAddedItems);

    setTimeout(() => {
      lastAmountRef.current?.focus();
    }, 0);
  };

  const handleSelectCustomer = (customer) => {


    setSelectedCustomer(customer);
    setIsCustomerDropdownVisible(false);
  };
  const handleKeyDownEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (accNoInputRef.current) {
      accNoInputRef.current.focus();
    }
  }, []);

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

  // const handleItemInputChange = (index, field, value) => {
  //   const updatedItems = [...addedItems];
  //   updatedItems[index] = {
  //     ...updatedItems[index],
  //     [field]: value,
  //   };
  //   setAddedItems(updatedItems);
  // };

  const handleItemInputChange = (index, field, value) => {
    const updatedItems = [...addedItems];
    let updatedItem = {
      ...updatedItems[index],
      [field]: value,
    };

    const excludedCodes = ["VDO", "VHA", "VSC"];
    const updateCodes = ["PAP", "HVC", "BOS"];
    const updateCodes2 = ["SDO", "SHA", "SSC"];

    const x = items.find((i) => i.ItemCode === "SSCL");
    const xTaxRate = parseFloat(x?.TaxRate ?? 0);
    const taxRate = parseFloat(updatedItem.TaxRate ?? 0);
    const amount = parseFloat(value) || 0;

    const getPercentAmount = (amount, rate) => Math.round(amount * (rate / 100));
    const calculateTaxBase = (base, rate) => {
      const y = base + ((base + 1) * rate / 100);
      const tax = Math.round((Math.round(y)) * taxRate / 100);
      return { amount: base, taxBase: tax };
    };

    const updateDependentItem = (code, baseValue) => {
      const idx = updatedItems.findIndex((i) => i.ItemCode === code);
      if (idx !== -1) {
        updatedItems[idx] = {
          ...updatedItems[idx],
          Amount: baseValue,
        };
      }
    };

    if (field === "Amount") {
      const skipTaxBaseCodes = [...excludedCodes, ...updateCodes2];

      if (!skipTaxBaseCodes.includes(updatedItem.ItemCode)) {
        const { taxBase } = calculateTaxBase(amount, xTaxRate);
        updatedItem.TaxBase = taxBase;
      }


      if (updateCodes.includes(updatedItem.ItemCode)) {
        switch (updatedItem.ItemCode) {
          case "PAP":
            updateDependentItem("VDO", updatedItem.TaxBase || 0);
            updateDependentItem("SDO", getPercentAmount(amount, xTaxRate));
            break;
          case "HVC":
            updateDependentItem("VHA", updatedItem.TaxBase || 0);
            updateDependentItem("SHA", getPercentAmount(amount, xTaxRate));
            break;
          case "BOS":
            updateDependentItem("VSC", updatedItem.TaxBase || 0);
            updateDependentItem("SSC", getPercentAmount(amount, xTaxRate));
            break;
        }
      }
    }


    updatedItems[index] = updatedItem;
    setAddedItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = localStorage.getItem("user");
    const userObject = JSON.parse(user);

    if (!validateHAWB(hawbNo)) {
      return;
    }

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

    const hasAmount = addedItems.some(
      (item) => parseFloat(item.Amount) === 0 || item.Amount === ""
    );

    if (hasAmount) {
      toast.info("Amount cannot be 0 in any row");
      return;
    }

    const postData = {
      Id: id,
      AccountNo: selectedCustomer.CustomerSVatNo,
      InvoiceNo: "",
      CreatedBy: parseInt(userObject.UserId) || null,
      CustomerName: selectedCustomer.CustomerName,
      CustomerCode: selectedCustomer.CustomerCode,
      Address1: selectedCustomer.CustomerAdd1,
      Address2: selectedCustomer.CustomerAdd2,
      Address3: selectedCustomer.CustomerAdd3,
      ContactNo: selectedCustomer.ContactNo,
      Accountant: accountant,
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
      CreatedUser: userObject.Name,
      BranchName: userObject.BranchName,
      SuspendedSVATCharges: suspendedSVATTotal,
      RegulatoryChargeAmount: calculateCodeTotal(),
      SuspendedTaxPercentage: parseFloat(settingValue),
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
      setIsSubmitting(true);
      const response = await fetch(`${Base_URL}/api/svatInvoice`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("fetching failed");
      }

      const data = await response.json();
      if (data.Message === "Invoice updated successfully.") {
        toast.success(data.Message);
        setPaymentDate(formattedDueDate);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateHAWB = (value) => {
    if (!value || value.length !== 10) {
      toast.warning("Invalid HAWB No");
      return false;
    }

    const getDigit = value.substring(0, 9);
    const checkDigit = parseInt(getDigit) % 7;
    const newHAWB = getDigit + checkDigit;

    if (value !== newHAWB) {
      toast.warning("Invalid HAWB No");
      return false;
    }

    return true;
  };

  const handleBlur = () => {
    if (tabPressed) {
      setTabPressed(false);
      return;
    }
    validateHAWB(hawbNo);
  };

  const CancelSubmit = () => {
    window.location.href = '/dhl-svat/invoice';
  };


  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  const calculateGrandTotal = () => {
    return addedItems.reduce((sum, item) => {
      const amount = parseFloat(item.Amount) || 0;
      return sum + amount;
    }, 0);
  };

  const calculateCodeTotal = () => {
    return addedItems
      .filter(item => item.TaxRate > 0)
      .reduce((sum, item) => {
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
          <h4 className="text-uppercase text-red">Update SVAT Invoice</h4>
          {/* <a href="/dhl-svat/invoice" className="btn btn-sm btn-theme-outline sm">
            Go Back
          </a> */}
        </div>
        <div className="col-12 my-3">
          <form
            action="/dhl-svat/invoice"
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDownEnter}
          >
            <div className="row">
              <div className="col-12 mb-3">
                <h6 className="text-dark fw-bold">General</h6>
              </div>
              <div className="col-lg-6 col-12">
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-dark">Account Number</label>
                    </div>
                    <div className="col-8 position-relative">
                      <div className="d-flex gap-1">
                        <input
                          ref={accNoInputRef}
                          className="form-control form-control-sm"
                          placeholder="Search Customer by Code"
                          value={
                            selectedCustomer
                              ? selectedCustomer.CustomerCode
                              : searchTermCustomer
                          }
                          onChange={(e) =>
                            setSearchTermCustomer(e.target.value)
                          }
                          onFocus={() =>
                            searchTermCustomer &&
                            setIsCustomerDropdownVisible(true)
                          }
                          onKeyDown={handleKeyDownCustomer}
                        />
                        <SearchCustomer customers={customers} onSelectCustomer={handleCustomerSelect} />
                      </div>
                      {isCustomerDropdownVisible &&
                        filteredCustomers.length > 0 && (
                          <ul
                            className="dropdown-menu w-100 show position-absolute"
                            style={{ maxHeight: "200px", overflowY: "auto" }}
                          >
                            {filteredCustomers.map((customer, index) => (
                              <li
                                key={index}
                                className={`dropdown-item ${index === highlightedIndex ? "active" : ""
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
                      <label className="text-dark">Customer Name</label>
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
                      <label className="text-dark">Address 1</label>
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
                      <label className="text-dark">Address 2</label>
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
                      <label className="text-dark">Address 3</label>
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
                      <label className="text-dark">Contact No</label>
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
                      <label className="text-dark">Reference Number</label>
                    </div>
                    <div className="col-8">
                      <input
                        value={refNo}
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
                      <label className="text-dark">Accountant</label>
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
                      <label className="text-dark">Document No</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        value={docNo}
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-dark">HAWB No</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        value={hawbNo}
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-1">
                  <div className="row">
                    <div className="col-4">
                      <label className="text-dark">Date</label>
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
                      <label className="text-dark">Payment Due Date</label>
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
                      <label className="text-dark">Origin</label>
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
                      <label className="text-dark">Destination</label>
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
                      <label className="text-dark">Peices</label>
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
                      <label className="text-dark">Weight</label>
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
                      <label className="text-dark">Content</label>
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
                      <label className="text-dark">Assesed Value</label>
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
                      <label className="text-dark">Arrival Date</label>
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
                      <label className="text-dark">Cusdec No</label>
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
                  ref={inputRef}
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
                        className={`dropdown-item ${index === highlightedIndex ? "active" : ""
                          }`}
                        onClick={() => handleSelectItem(item)}
                      >
                        {item.ItemCode} - {item.ItemDesc}
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
                              onClick={() => {
                                const code = item.ItemCode;

                                // Prevent deletion if dependent items exist
                                if (code === "PAP" && addedItems.some(i => i.ItemCode === "SDO")) {
                                  toast.warning("Please delete SDO first");
                                  return;
                                }
                                if (code === "HVC" && addedItems.some(i => i.ItemCode === "SHA")) {
                                  toast.warning("Please delete SHA first");
                                  return;
                                }
                                if (code === "BOS" && addedItems.some(i => i.ItemCode === "SSC")) {
                                  toast.warning("Please delete SSC first");
                                  return;
                                }

                                const updated = addedItems.filter(i => i.ItemCode !== code);

                                // Also zero out dependent items
                                const zeroDependent = (targetCode) => {
                                  const index = updated.findIndex(i => i.ItemCode === targetCode);
                                  if (index !== -1) {
                                    updated[index] = {
                                      ...updated[index],
                                      Amount: 0,
                                    };
                                  }
                                };

                                switch (code) {
                                  case "PAP":
                                    zeroDependent("VDO");
                                    break;
                                  case "HVC":
                                    zeroDependent("VHA");
                                    break;
                                  case "BOS":
                                    zeroDependent("VSC");
                                    break;
                                }

                                setAddedItems(updated);
                              }}
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
                              value={item.TaxBase || 0}
                              readOnly
                            />
                          </td>
                          <td className="p-1">
                            <input
                              value={item.Amount}
                              type="number"
                              className="form-control form-control-sm"
                              ref={index === addedItems.length - 1 ? lastAmountRef : null}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  inputRef.current?.focus();
                                }
                              }}
                              onChange={(e) =>
                                handleItemInputChange(index, "Amount", e.target.value)
                              }
                            />

                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th className="p-1 text-end" colSpan="2">
                          Liability Total Amount
                        </th>
                        <th className="p-1" colSpan={2}>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            readOnly
                            value={calculateCodeTotal()}
                          />
                        </th>
                        <th className="p-1 text-end" colSpan="1">
                          Suspended VAT Charges
                        </th>
                        <th className="p-1 d-flex gap-1">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            readOnly
                            value={calculateSuspendedSVATTotal()}
                          />
                        </th>
                        <th className="p-1 text-end">Grand Total</th>
                        <th className="p-1">
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            value={calculateGrandTotal()}
                            readOnly
                          />
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div className="col-12 d-flex gap-3 justify-content-end my-2">
                <button
                  type="button"
                  onClick={CancelSubmit}
                  className="btn btn-sm btn-theme-outline"
                >
                  Back
                </button>
                <button type="submit" disabled={isSubmitting} className="btn btn-sm btn-theme">
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

export default EditSVATInvoice;
