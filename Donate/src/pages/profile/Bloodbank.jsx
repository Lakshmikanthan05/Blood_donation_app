import React, { useEffect, useState } from 'react'
import { UserData } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';
import "./profile.css";
import { updateBloodbankdonate } from '../../components/bloodrequest/Bloodrequest';
import { FaEdit } from "react-icons/fa";

const Bloodbank = () => {
    const navigate = useNavigate();
    const { user, bloodbankdetail, donat, fetchUser }= UserData();
    
    console.log(`donates: ...donat`,donat);

    useEffect(() => {
        if (!bloodbankdetail) {
            navigate('/editbloodbank');
        }
    }, [bloodbankdetail]);

    

  return (
    <div className='contain'>
        <div className='subcontain'>
            <h2>Blood bank</h2>
            { bloodbankdetail ? (
                <div className='con'>
                    <div className='subcon'>
                        <p>Branch</p>
                        <p>Phone No</p>
                        <p>Email ID</p>
                        <p>Address</p>
                    </div>
                    <div className='subcon'>
                        <p>{bloodbankdetail.branch}</p>
                        <p>{bloodbankdetail.phone}</p>
                        <p>{user.email}</p>
                        <p>{bloodbankdetail.address}</p>
                    </div>
                </div>
            ) : (
                <p style={{ padding: "1rem", color: "gray" }}>Blood bank profile not available.</p>
            )
            }
            
            <div className='lk'>
                <button onClick={() => navigate("/editbloodbank")} className="common">
                    <FaEdit style={{ marginRight: "8px" }} />
                    Edit Detail
                </button>
            </div>
            
        </div>

        
    </div>
  )
}

export default Bloodbank
