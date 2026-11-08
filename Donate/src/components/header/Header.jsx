import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import logo from "../../assets/img/Project_logo.avif";

const Header = () => {
    const navigate = useNavigate();
    const { isAuth, user , setIsAuth, setUser, setDonordetail, setBloodbankdetail, setHospitaldetail, setStoredetail} = UserData();

    const logout = () => {
        localStorage.clear();
        setUser([]);
        setBloodbankdetail([]);
        setHospitaldetail([]);
        setDonordetail([]);
        setStoredetail([]);
        navigate("/login");
        setIsAuth(false);
        toast.success("Logged Out");
        
    };
  return (
    <header>
      <img className="logo" src={logo} alt="Logo" />

      <div className="header-right">
        {
          isAuth && user.role === "Donor" && (
            <>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/donorrequestshow">Blood Alert</Link></li>
                <li><Link to="/donatedhistory">Donated History</Link></li>
              </ul>
            </nav>
            </>
          )
        }

        {
          isAuth && user.role === "Blood_bank" && (
            <>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/bloodalert">Blood Alert</Link></li>
                <li><Link to="/viewstock">View Stock</Link></li>
                <li><Link to="/newstock">New stock</Link></li>
              </ul>
            </nav>
            </>
          )
        }

        {
          isAuth && user.role === "Hospital" && (
            <>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/hospitalrequest">Blood Requested</Link></li>
                <li><Link to="/requestblood">Request Blood</Link></li>
              </ul>
            </nav>
            </>
          )
        }
        
        {isAuth ? (
          <button className="com" onClick={logout}>Log Out</button>
        ) : (
          <>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
            </ul>
          </nav>
          <button className="com" onClick={() => navigate("/login")}>Log In</button></>
        )}
      </div>
    </header>

  );
};

export default Header;