import React, { useState } from 'react'
import { UserData } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import "./edit.css";
const EditDonor = () => {
    const navigate = useNavigate();
    const { editDonorDetail } = UserData();
    const [name,setName] = useState("");
    const [age, setAge] = useState();
    const [phone, setPhone] = useState("");
    const [bloodgrp, setBloodgrp] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");

    const submitHandler = async (e) => {
    e.preventDefault();
    await editDonorDetail(name, age, phone, gender, bloodgrp, address, navigate);
  };
  return (
    <div className='contai'>
        <div className='subcontai'>
            <h2> Edit Donor </h2>
            <form onSubmit={submitHandler}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label htmlFor="age">Age</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
                <label htmlFor="phone">Phone No</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <label htmlFor="gender">Gender</label>
                <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                />
                <label htmlFor="bloodgrp">Blood Group</label>
                <input
                    type="text"
                    value={bloodgrp}
                    onChange={(e) => setBloodgrp(e.target.value)}
                    required
                />
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <button type='submit' className="common-btn">Save</button>
            </form>
        </div>
    </div>
  )
}

export default EditDonor
