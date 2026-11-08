import React, { useEffect } from 'react'
import { UserData } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';
import "./profile.css";
import { donorConfirm } from '../../components/alertDonor/Alertdonor';
import { FaEdit } from "react-icons/fa";

const Donor = () => {
    const { user, donordetail, donoralertdetail }= UserData();
    const navigate = useNavigate();

    useEffect(() => {
        if (!donordetail) {
            navigate('/editdonor');
        }
    }, [donordetail]);
    
  return (
    <div className='contain'>
        <div className='subcontain'>
            <h2>Donor</h2>
            {donordetail ? (
                <div className='con'>
                    <div className='subcon'>
                    <p>Name</p>
                    <p>Age</p>
                    <p>Phone No</p>
                    <p>Gender</p>
                    <p>Blood Group</p>
                    <p>Email ID</p>
                    <p>Address</p>
                    </div>
                    <div className='subcon'>
                        <p>{donordetail.name}</p>
                        <p>{donordetail.age}</p>
                        <p>{donordetail.phone}</p>
                        <p>{donordetail.gender}</p>
                        <p>{donordetail.bloodgrp}</p>
                        <p>{user?.email}</p>
                        <p>{donordetail.address}</p>
                        </div>
                    </div>
                    ) : (
                    <p style={{ padding: "1rem", color: "gray" }}>Donor profile not available.</p>
            )}

            <button onClick={()=>navigate("/editdonor")} className="common">
                <FaEdit style={{ marginRight: "8px" }} />
                Edit detail</button>

        </div>

        
        
    </div>
  )
}

export default Donor
