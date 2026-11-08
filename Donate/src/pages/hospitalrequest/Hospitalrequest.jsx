import React from 'react'
import { updateHospitalrequest } from '../../components/bloodrequest/Bloodrequest';
import { UserData } from '../../context/UserContext';

const Hospitalrequest = () => {

    const { hospitalrequest } = UserData();
    
    const handleAccept = async (id) => {
        try {
            const updated = await updateHospitalrequest(id);
            const updatedList = donat.map((item) =>
            item._id === id ? { ...item, state: "Accepted" } : item
            );
            setComplete({});
        } catch (error) {
            console.error("Error updating state:", error);
        }
        
    };
  return (
    <div className='contain'>
      <div className='subcontain'>
            <h2>Requested Blood</h2>
            <table>
            <thead>
                <tr>
                <th>Branch</th>
                <th>Phone No</th>
                <th>Address</th>
                <th>Blood Group</th>
                <th>Units </th>
                <th>State</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {hospitalrequest && hospitalrequest.length > 0 ? (
                    hospitalrequest.map((item, index) => (
                    <tr key={index}>
                        <td>{item.branch}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                        <td>{item.bloodgrp}</td>
                        <td>{item.unit}</td>
                        <td>{item.state}</td>
                        <td>
                        {item.state !== "Completed" && (
                            <button
                            className="accept"
                            onClick={() => handleAccept(item._id)}
                            >
                            Complete
                            </button>
                        )}
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="6">No orders available</td>
                    </tr>
                )}
                </tbody>

            </table>
        </div>
    </div>
  )
}

export default Hospitalrequest
