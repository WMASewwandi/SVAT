import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./css/style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import ItemMaster from "./component/Master/item";
import CustomerMaster from "./component/Master/customers";
import Invoice from "./component/Invoice";
import CreateInvoice from "./component/Invoice/create";
import ReportCustomer from "./component/Reports/customer";
import ReportBulkInvoice from "./component/Reports/bulk-invoice";
import Users from "./component/Authentication";
import UserRole from "./component/Authentication/user-role";
import Settings from "./component/Authentication/settings";

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <Routes>
          <Route path="/dhl-svat/" element={<Login />} />
          <Route path="/dhl-svat/dashboard" element={<Dashboard />} />
          <Route path="/dhl-svat/master/items" element={<ItemMaster />} />
          <Route path="/dhl-svat/master/customers" element={<CustomerMaster />} />
          <Route path="/dhl-svat/invoice" element={<Invoice />} />
          <Route path="/dhl-svat/invoice/create" element={<CreateInvoice />} />
          <Route path="/dhl-svat/report/customer" element={<ReportCustomer />} />
          <Route path="/dhl-svat/report/bulk-invoice" element={<ReportBulkInvoice />} />
          <Route path="/dhl-svat/authentication/users" element={<Users />} />
          <Route path="/dhl-svat/authentication/roles" element={<UserRole />} />
          <Route path="/dhl-svat/authentication/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
