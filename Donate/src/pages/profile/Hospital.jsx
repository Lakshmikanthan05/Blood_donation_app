import React, { useEffect } from 'react'
import { UserData } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';
import "./profile.css";
import { updateHospitalrequest } from '../../components/bloodrequest/Bloodrequest';
import { FaEdit } from "react-icons/fa";

const Hospital = () => {
    const navigate = useNavigate();
    const { user, hospitaldetail, hospitalrequest, refreshmethod }= UserData();


    useEffect(() => {
        if (!hospitaldetail) {
            navigate('/edithospital');
        }
    }, [hospitaldetail]);

    
    
  return (
    <div className='contain'>
        <div className='subcontain'>
            <h2>Hospital</h2>
            { hospitaldetail ? (
                <div className='con'>
                    <div className='subcon'>
                        <p>Center</p>
                        <p>Phone No</p>
                        <p>Email ID</p>
                        <p>Address</p>
                    </div>
                    <div className='subcon'>
                        <p>{hospitaldetail.center}</p>
                        <p>{hospitaldetail.phone}</p>
                        <p>{user.email}</p>
                        <p>{hospitaldetail.address}</p>
                    </div>
                </div>
            ) : (
                <p style={{ padding: "1rem", color: "gray" }}>Blood bank profile not available.</p>
            )}
            
            <div>
                <button onClick={()=>navigate("/edithospital")} className="common">
                    <FaEdit style={{ marginRight: "8px" }} />
                    Edit detail</button>
            </div>
            
        </div>
        
    </div>
  )
}

export default Hospital
