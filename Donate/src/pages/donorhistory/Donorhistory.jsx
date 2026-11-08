import React from 'react'
import { UserData } from '../../context/UserContext'

const Donorhistory = () => {

    const { donorhistory } = UserData();
  return (
    <div className='contain'>
        <div className='subcontain'>
                {donorhistory.length <= 0 && <p>No active donation history.</p>}
                {donorhistory.length > 0 && (
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
                            </tr>
                            </thead>
                            <tbody>
                                {donorhistory && donorhistory.length > 0 && (
                                    donorhistory.map((item, index) => (
                                        <tr key={index}>
                                        <td>{item.branch}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.address}</td>
                                        <td>{item.state}</td>
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

export default Donorhistory
