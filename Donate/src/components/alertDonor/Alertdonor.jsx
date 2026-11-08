// utils/alertDonorLogic.js
import axios from "axios";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";

export const alertDonorLogic = async (store, bloodbankdetail) => {
  const bloodGroups = [
    { type: 'A_positive', bloodgrp: 'A+ve', threshold: 30 },
    { type: 'B_positive', bloodgrp: 'B+ve', threshold: 20 },
    { type: 'A_negative', bloodgrp: 'A-ve', threshold: 5 },
    { type: 'B_negative', bloodgrp: 'B-ve', threshold: 5 },
    { type: 'O_positive', bloodgrp: 'O+ve', threshold: 30 },
    { type: 'O_negative', bloodgrp: 'O-ve', threshold: 10 },
    { type: 'AB_positive', bloodgrp: 'AB+ve', threshold: 10 },
    { type: 'AB_negative', bloodgrp: 'AB-ve', threshold: 5 },
  ];

  for (const group of bloodGroups) {
    if (store[group.type] < group.threshold) {
      try {
        const response = await fetch(`${server}/api/donors`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({ bloodgrp: group.bloodgrp }),
        });
        const data = await response.json();
        await sendAlert(data.alertdata, bloodbankdetail, group.type);
      } catch (error) {
        console.error(`Error fetching ${group.type} donors:`, error);
      }
    }
  }
};

const sendAlert = async (donors, bloodbankdetail, group) => {
  
  try {
    const alertData = donors.map((donor) => ({
      id: donor.id,
      branch_id: bloodbankdetail.id,
      branch: bloodbankdetail.branch,
      phone: bloodbankdetail.phone,
      address: bloodbankdetail.address,
      state: "pending",
    }));

    const response = await fetch(`${server}/api/alerts/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ alerts: alertData, bloodGroup: group }),
    });

    const result = await response.json();
    console.log(`Donor alerts stored for ${group}:`, result);
    window.location.reload();
  } catch (error) {
    console.error("Error sending alerts to backend:", error);
  }
};

export const donorConfirm = async(status, user) => {
  
  try {
    const response = await axios.post(`${server}/api/alerts/confirm`, 
      {
        status,
        user,
      },
      { headers: { token: localStorage.getItem("token"), } }
    )
    window.location.reload();
  } catch(error) {
    console.error("Error updating donor status:", error);
  }

};

