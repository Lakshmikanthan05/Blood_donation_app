import React, { useState } from 'react'
import { UserData } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import "./edit.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
      width: "100%",
      height: "400px"
    };

const centerpoint = {
    lat: 20.5937, 
    lng: 78.9629
};

const EditHospital = () => {
    const navigate = useNavigate();
    const { editHospitalDetail } = UserData();
    const [center,setCenter] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [markerPosition, setMarkerPosition] = useState(null);
    
      const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        console.log("Clicked Location:", { lat, lng });
        setMarkerPosition({ lat, lng });
      };

    const submitHandler = async (e) => {
    e.preventDefault();
    await editHospitalDetail(center, phone, address, markerPosition, navigate);
  };
  return (
    <div className='contai'>
        <div className='subcontai'>
            <h2> Edit Hospital </h2>
            <form onSubmit={submitHandler}>
                <label htmlFor="center">Center</label>
                <input
                    type="text"
                    value={center}
                    onChange={(e) => setCenter(e.target.value)}
                    required
                />
                <label htmlFor="phone">Phone No</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <div>
                    <p>Mark the location in map</p>
                    <LoadScript googleMapsApiKey="AIzaSyD3zbNJIhAP-jQah4XXsp7N0G80XKKJLOI">
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={centerpoint}
                        zoom={5}
                        onClick={handleMapClick}
                      >
                        {markerPosition && <Marker position={markerPosition} />}
                      </GoogleMap>
                    </LoadScript>
                </div>
                <button type='submit' className="common-btn">Save</button>
            </form>
        </div>
    </div>
  )
}

export default EditHospital
