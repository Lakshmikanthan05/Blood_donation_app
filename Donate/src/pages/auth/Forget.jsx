import axios from 'axios';
import React, { useState } from 'react';
import { server } from "../../main";
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Forget = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(`${server}/api/checkemail`,
                {email,password}
            );
            localStorage.setItem("activationToken", data.activationToken);
            navigate("/verify");
        } catch (error) {
            alert("Invalid email");
        }
    };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Reset Password</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
            <div className="password-field">
                
                <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>

          <button  type="submit" className="common">
            Reset Password
          </button>
        </form>
        
      </div>
    </div>
  )
}

export default Forget
