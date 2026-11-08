import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Requestblood.css";
import { Bloodrequest } from '../../components/bloodrequest/Bloodrequest';
import { UserData } from '../../context/UserContext';

const Requestblood = () => {
    const { user } = UserData();
    const navigate = useNavigate();
    const [ bloodgrp, setBloodgrp ] = useState("");
    const [ unit, setUnit ] = useState();

    const submitHandler = async (e) => {
        e.preventDefault();

        
        const bloodGroups = [
            { type: 'A_positive', bloodgrp: 'A+ve' },
            { type: 'B_positive', bloodgrp: 'B+ve' },
            { type: 'A_negative', bloodgrp: 'A-ve' },
            { type: 'B_negative', bloodgrp: 'B-ve' },
            { type: 'O_positive', bloodgrp: 'O+ve' },
            { type: 'O_negative', bloodgrp: 'O-ve' },
            { type: 'AB_positive', bloodgrp: 'AB+ve' },
            { type: 'AB_negative', bloodgrp: 'AB-ve' },
        ];

        
        const matched = bloodGroups.find(group => group.bloodgrp === bloodgrp);
        const BloodType = matched ? matched.type : null;

        if (!BloodType) {
            alert("Invalid blood group entered");
            return;
        }

        await Bloodrequest(BloodType, bloodgrp, unit, user, navigate);
        window.location.reload();
    };

  return (
    <div className='contain'>
        <div className='subcont'>
            <h2>Request Blood</h2>
            <form onSubmit={submitHandler}>
                <label htmlFor="bloodgrp">Blood group</label>
                <input
                    type="text"
                    value={bloodgrp}
                    onChange={(e) => setBloodgrp(e.target.value)}
                    required
                />
                <label htmlFor="unit">No of units</label>
                <input
                    type="number"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    required
                />
                <button type='submit' className="common-btn">Request</button>
            </form>
        </div>
    </div>
  )
}

export default Requestblood
