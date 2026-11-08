import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/home/Home';
import Verify from './pages/auth/Verify';
import { UserData } from './context/UserContext';
import Donor from './pages/profile/Donor';
import Bloodbank from './pages/profile/Bloodbank';
import Hospital from './pages/profile/Hospital';
import Header from './components/header/Header';
import EditDonor from './pages/editProfile/EditDonor';
import EditHospital from './pages/editProfile/EditHospital';
import EditBloodbank from './pages/editProfile/EditBloodbank';
import Newstock from './pages/newstock/Newstock';
import Viewstock from './pages/viewstock/Viewstock';
import Loading from './components/loading/Loading';
import Requestblood from './pages/requestblood/Requestblood';
import video from "./assets/video/background_video_2.mp4";
import Forget from './pages/auth/Forget';
import back from "./assets/img/wallpaper.jpg";
import Donorrequestshow from './pages/donorrequest/Donorrequestshow';
import Donorhistory from './pages/donorhistory/Donorhistory';
import Bloodbankrequest from './pages/bloodbankrequest/Bloodbankrequest';
import Hospitalrequest from './pages/hospitalrequest/Hospitalrequest';
function App() {
  const { isAuth, user, loading } = UserData();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="app-container">
          <img className='back' src={back} alt='back' />

          <div className="app-content">
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={isAuth ? <Navigate to="/profile" /> : <Login />} />
                <Route path="/register" element={isAuth ? <Navigate to="/profile" /> : <Register />} />
                <Route path="/forgetpassword" element={<Forget />} />
                <Route path="/verify" element={isAuth ? <Navigate to="/profile" /> : <Verify />} />
                <Route path="/profile" element={user.role === "Donor" ? <Donor /> : user.role === "Hospital" ? <Hospital /> : <Bloodbank />} />
                <Route path="/editdonor" element={isAuth && user.role === "Donor" ? <EditDonor /> : <Login />} />
                <Route path="/edithospital" element={isAuth && user.role === "Hospital" ? <EditHospital /> : <Login />} />
                <Route path="/editbloodbank" element={isAuth && user.role === "Blood_bank" ? <EditBloodbank /> : <Login />} />
                <Route path="/newstock" element={isAuth ? <Newstock /> : <Login />} />
                <Route path="/viewstock" element={isAuth ? <Viewstock /> : <Login />} />
                <Route path="/requestblood" element={isAuth ? <Requestblood /> : <Login />} />
                <Route path="/donorrequestshow" element={isAuth ? <Donorrequestshow /> : <Login />} />
                <Route path="/donatedhistory" element={isAuth ? <Donorhistory /> : <Login />} />
                <Route path="/bloodalert" element={isAuth ? <Bloodbankrequest /> : <Login />} />
                <Route path="/hospitalrequest" element={isAuth ? <Hospitalrequest /> : <Login />} />
              </Routes>
            </BrowserRouter>
      </div>
      </div>
      )}
    </>
  );
}

export default App;
