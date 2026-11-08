import React, { useState } from 'react'
import { UserData } from '../../context/UserContext'
import "./newstock.css";
import axios from 'axios';
import { server } from '../../main';
const Newstock = () => {

  const { user, bloodbankdetail, storedetail, donoraccepted } = UserData();
  const [unitsDonated, setUnitsDonated] = useState({});
  const [complete, setComplete] = useState({}); 



  const handleUnitChange = (donorId, value) => {
    setUnitsDonated(prev => ({
      ...prev,
      [donorId]: value
    }));
  };

  const handleProcess = async (donorId) => {
  try {
    const unit = unitsDonated[donorId];
    if (!unit) {
      alert("Please enter a valid number of units.");
      return;
    }

    const response = await axios.post(`${server}/api/donors/donated`, {
      donorId, 
      unit,
      bloodbankdetail,
    }, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    window.location.reload();
    console.log("Donated successfully:", response.data);

    setComplete(prev => ({
      ...prev,
      [donorId]: true
    }));
  } catch (error) {
    console.error("Donation error:", error);
    alert("Error processing donation.");
  }
};

  return (
    <div className='stockcon'>
      <div className='substockcon'>
        <h2>{bloodbankdetail?.branch} branch new stocks</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone No</th>
              <th>Blood Group</th>
              <th>Address</th>
              <th>Units Donated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {donoraccepted?.length > 0 ? (
              donoraccepted.map((donor) => (
                <tr key={donor.id}>
                  <td>{donor.name}</td>
                  <td>{donor.phone}</td>
                  <td>{donor.bloodgrp}</td>
                  <td>{donor.address}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      placeholder="Units"
                      value={unitsDonated[donor.id] || ""}
                      onChange={(e) => handleUnitChange(donor.id, e.target.value)}
                      disabled={complete[donor._id]}
                    />
                  </td>
                  <td>
                    {!complete[donor.id] ? (
                      <button onClick={() => handleProcess(donor.id)} className='accept'>Donated</button>
                    ) : (
                      <span>Done</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No accepted donors</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Newstock
