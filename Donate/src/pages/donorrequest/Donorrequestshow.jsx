import React from 'react'
import { UserData } from '../../context/UserContext'

const Donorrequestshow = () => {

    const { donoralertdetail } = UserData();
  return (
    <div className='contain'>
        <div className='subcontain'>
                {donoralertdetail.length <= 0 && <p>No active donation alerts at the moment.</p>}
                {donoralertdetail.length > 0 && (
                    <>
                    <h2>Donation Alert</h2>
                    <div className='alert'>
                        <table>
                            <thead>
                            <tr>
                                <th>Branch</th>
                                <th>Phone No</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                {donoralertdetail && donoralertdetail.length > 0 && (
                                    donoralertdetail.map((item, index) => (
                                        <tr key={index}>
                                        <td>{item.branch}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.address}</td>
                                        <td>{item.state}</td>
                                        <td>
                                            {
                                                item.state === "pending" && (
                                                    <>
                                                    <button onClick={() => donorConfirm("Accepted", user)} className='accept'>Accept</button>
                                                    <button onClick={() => donorConfirm("Rejected", user)} className='reject'>Reject</button>
                                                    </>
                                                )
                                            }
                                        </td>
                                        </tr>
                                    ))
                                ) }
                            </tbody>
                        </table>

                        
                    </div>
                    </>
                )}
                
            </div>
    </div>
  )
}

export default Donorrequestshow
