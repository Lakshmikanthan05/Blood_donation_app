import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";
import { alertDonorLogic } from "../components/alertDonor/Alertdonor";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [donordetail, setDonordetail] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [hospitaldetail, setHospitaldetail] = useState([]);
  const [bloodbankdetail, setBloodbankdetail] = useState([]);
  const [storedetail, setStoredetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [donoralertdetail, setDonoralertdetail] = useState([]);
  const [donoraccepted, setDonoraccepted] = useState([]);
  const [donat, setDonat] = useState([]);
  const [hospitalrequest, setHospitalrequest] = useState([]);
  const [donorhistory, setDonorhistory] = useState([]);
  

  async function loginUser(email, password, navigate) {
    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      window.location.reload();
    } catch (error) {
      setIsAuth(false);
      alert("Please, enter correct email and password");
    }
  }

  async function registerUser(role, email, password, navigate) {
    try {
      setLoading(true);
      const { data } = await axios.post(`${server}/api/user/register`, {
        role,
        email,
        password,
      });
      setLoading(false);
      toast.success(data.message);

      localStorage.setItem("activationToken", data.activationToken);
      navigate("/verify");
    } catch (error) {
      
      toast.error(error.response.data.message);
    }
  }

  async function verifyOtp(otp, navigate) {
    setLoading(true);
    const activationToken = localStorage.getItem("activationToken");
    try {
      const { data } = await axios.post(`${server}/api/user/verify`, {
        otp,
        activationToken,
      });
      setLoading(false);
      toast.success(data.message);
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function editDonorDetail(name, age, phone, gender, bloodgrp, address, navigate) {
    try {
      console.log(name, age, phone, bloodgrp, address, user);
        const { data } = await axios.post(
            `${server}/api/donor/edit`,
            { name, age, phone, gender, bloodgrp, address, user},
            { headers: { token: localStorage.getItem("token"), } }
        );

        toast.success(data.message);
        navigate("/profile");
        window.location.reload();
    } catch (error) {
        toast.error(error.response?.data?.message || "Update failed");
    }
}

  async function editHospitalDetail(center, phone, address, markerPosition, navigate) {
    try {
      console.log(center, phone, address, markerPosition, user);
        const { data } = await axios.post(
            `${server}/api/hospital/edit`,
            { center, phone, address, markerPosition, user},
            { headers: { token: localStorage.getItem("token"), } }
        );

        toast.success(data.message);
        navigate("/profile");
        window.location.reload();
    } catch (error) {
        toast.error(error.response?.data?.message || "Update failed");
    }
}

  async function editBloodbankdetail(branch, phone, address, markerPosition, navigate) {
    try {
      console.log(branch, phone, address, markerPosition, user);
        const { data } = await axios.post(
            `${server}/api/bloodbank/edit`,
            { branch, phone, address, markerPosition, user},
            { headers: { token: localStorage.getItem("token"), } }
        );

        toast.success(data.message);
        navigate("/profile");
        window.location.reload();
    } catch (error) {
        toast.error(error.response?.data?.message || "Update failed");
    }
}

  async function fetchUser() {
  try {
    const { data } = await axios.get(`${server}/api/user/me`, {
      headers: { token: localStorage.getItem("token") },
    });

    setIsAuth(true);
    setUser(data.user);
    setDonordetail(data.donordetail || null);
    setHospitaldetail(data.hospitaldetail || null);
    setBloodbankdetail(data.bloodbankdetail || null);
    setStoredetail(data.storedetail || null);
    setDonoralertdetail(data.donoralertdetail || null);
    setDonat(data.bloodbankdonate || null);
    setHospitalrequest(data.hospitalrequest || null);
    setDonorhistory(data.donorhistory || null);
    setLoading(false);
    console.log(data.user);
    console.log(data.donordetail);
    console.log(data.hospitaldetail);
    console.log(data.bloodbankdetail);
    console.log(data.storedetail);
    console.log(data.hospitalrequest);
    console.log(data.donorhistory);
  }  catch (error) {
      console.log(error);
      if (error.response && error.response.status === 403) {
          localStorage.removeItem("token");
          setIsAuth(false);
      }
      setLoading(false);
    }
}
function refreshmethod() {
  fetchUser();
}

async function fetchAcceptedDonor() {
  try {
    const { data } = await axios.get(`${server}/api/donors/accepted`, {
      headers: {
        token: localStorage.getItem("token"),
      },
      params: {
        id: user._id, 
      },
  });
    console.log(data.donors);
    setDonoraccepted(data.donors);
  } catch (error) {
    console.log(error);
  }
}


  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
  if (user?.role === "Blood_bank") {
    fetchAcceptedDonor();
  }
}, [user]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // e.g., '2025-04-04'
    const lastRun = localStorage.getItem("alertLastRun");

    if (user?.role === "Blood_bank" && lastRun !== today) {
      alertDonorLogic(storedetail, bloodbankdetail);
      localStorage.setItem("alertLastRun", today);
    }
  }, [user]);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuth,
        setIsAuth,
        donordetail,
        setDonordetail,
        hospitaldetail,
        setHospitaldetail,
        bloodbankdetail,
        setBloodbankdetail,
        donoralertdetail,
        setDonoralertdetail,
        donoraccepted,
        setDonoraccepted,
        donat,
        setDonat,
        hospitalrequest,
        setHospitalrequest,
        donorhistory,
        setDonorhistory,
        storedetail,
        loading,
        setStoredetail,
        loginUser,
        registerUser,
        verifyOtp,
        editDonorDetail,
        editHospitalDetail,
        editBloodbankdetail,
        fetchAcceptedDonor,
        fetchUser,
        refreshmethod, 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);