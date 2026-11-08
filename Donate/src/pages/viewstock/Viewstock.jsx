import React from 'react'
import { UserData } from '../../context/UserContext'
import "./stock.css";
const Viewstock = () => {

    const { user, bloodbankdetail, storedetail } = UserData();
  return (
    <div className='stockcon'>
      <div className='substockcon'>
        <h2>{bloodbankdetail.branch} branch stocks</h2>
        <table>
            <thead>
            <tr>
                <th>A+Ve</th>
                <th>A-Ve</th>
                <th>B+Ve</th>
                <th>B-Ve</th>
                <th>AB+Ve</th>
                <th>AB-Ve</th>
                <th>O+Ve</th>
                <th>O-Ve</th>
            </tr>
            </thead>
            <tbody>
            
                <tr>
                <td>{storedetail.A_positive}</td>
                <td>{storedetail.A_negative}</td>
                <td>{storedetail.B_positive}</td>
                <td>{storedetail.B_negative}</td>
                <td>{storedetail.AB_positive}</td>
                <td>{storedetail.AB_negative}</td>
                <td>{storedetail.O_positive}</td>
                <td>{storedetail.O_negative}</td>
                </tr>
            </tbody>
        </table>

      </div>
    </div>
  )
}

export default Viewstock
