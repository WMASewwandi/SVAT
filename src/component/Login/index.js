import React, { useEffect, useState } from "react";
import Base_URL from "../../Base/api";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState("");
  const [branches, setBranches] = useState([]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${Base_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username: email,
          Password: password,
          BranchCode: branch,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }else{
        const data = await response.json();        
        if(data.Message === "Successfully Login"){
          toast.success(data.Message);
          localStorage.setItem('user',JSON.stringify(data));
          localStorage.setItem("activeLink", "Dashboard");
          localStorage.setItem("activeParentMenu", "");
          setTimeout(() => {
            window.location.href = '/dhl-svat/home';
          }, 2000);
        }else{
          toast.error(data.Message);
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/branch`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("fetching failed");
      }

      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <>
    <ToastContainer/>
      <div className="container">
        <div className="row min-vh-100 d-flex align-items-center justify-content-center">
          <div className="col-lg-4 col-md-8 d-flex justify-content-center col-12">
            <div className="wrapper">
              <form id="login-form" onSubmit={handleLogin}>
                <h1 className="text-red fw-500">Login</h1>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <i className="fa text-red fa-user"></i>
                </div>
                <div className="input-box">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="login-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <i className="fa text-red fa-key"></i>
                </div>
                <div className="input-box">
                  <select
                    id="branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    required
                  >
                    <option value="">Select Branch</option>
                    {branches.map((branch, index) => (
                      <option key={index} value={branch.BranchCode}>
                        {branch.BranchDesc}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <div className="remember-forgot">
                  <label className="text-red">
                    <input
                      id="password-visibility"
                      type="checkbox"
                      onChange={togglePasswordVisibility}
                    />
                    Show Password
                  </label>
                  <a className="text-red" href="#">
                    Forgot Password
                  </a>
                </div> */}
                <button type="submit" className="btn">
                  Login
                </button>
                <div className="register-link">
                  {/* <p className="text-red">
                    Don't have an account? <a href="#">Register</a>
                  </p> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
