import axios from "axios"
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
export const Bloodrequest = async(BloodType, bloodgrp, unit, user, navigate) => {
    
    try {
        const response = await axios.post(`${server}/api/bloodrequest`,
            {
                BloodType,
                bloodgrp,
                unit,
                user,
            },
            { headers: { token: localStorage.getItem("token"), } }
        );
        if (response.data.success) {
            alert("Blood Request Sent Successfully");
        }
        else {
            alert("Blood alert failed");
        }
        window.location.reload();
    }
    catch (error) {
        console.log(error);
    }
}

export const updateBloodbankdonate = async(donorId) => {
    
    try {
        const response = await axios.post(`${server}/api/updatebloodbankdonate`,
            {donorId},{ headers: { token: localStorage.getItem("token"), } }
        );
        window.location.reload();
    }
    catch (error) {
        console.log(error);
    }
}

export const updateHospitalrequest = async(donorId) => {
    
    try {
        const response = await axios.post(`${server}/api/updatehospitalrequest`,
            {donorId},{ headers: { token: localStorage.getItem("token"), } }
        );
        window.location.reload();
    }
    catch (error) {
        console.log(error);
    }
}

