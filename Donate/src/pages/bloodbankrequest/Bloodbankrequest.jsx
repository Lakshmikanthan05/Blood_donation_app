import React, { useState } from 'react'
import { updateBloodbankdonate } from '../../components/bloodrequest/Bloodrequest';
import { UserData } from '../../context/UserContext';

const Bloodbankrequest = () => {

    const { donat } = UserData();
    const [complete, setComplete] = useState({});

    const handleAccept = async (id) => {
        try {
            const updated = await updateBloodbankdonate(id);
            await fetchUser();
            const updatedList = donat.map((item) =>
            item._id === id ? { ...item, state: "Accepted" } : item
            );
            setComplete({});
            window.location.reload();
        } catch (error) {
            console.error("Error updating state:", error);
        }
         
    };
  return (
    <div className='contain'>
      <div className='subcontain'>
            <h2>Ordered</h2>
            <table>
            <thead>
                <tr>
                <th>Branch</th>
                <th>Phone No</th>
                <th>Address</th>
                <th>Blood Group</th>
                <th>Units </th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {donat && donat.length > 0 ?(
                    donat.map((item, index) => (
                    <tr key={index}>
                        <td>{item.branch}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                        <td>{item.bloodgrp}</td>
                        <td>{item.unit}</td>
                        <td>
                        {item.state !== "Accepted" ? (
                            <button
                            className="accept"
                            onClick={() => handleAccept(item._id)}
                            >
                            Accept
                            </button>
                        ) : (
                            <span>Accepted</span>
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

export default Bloodbankrequest
