import TryCatch from "../middleware/TryCatch.js";
import { Blood_bank } from "../model/Blood_bank.js";
import { Bloodbankdonate } from "../model/Bloodbankdonate.js";
import { Hospital } from "../model/Hospital.js";
import { Hospitalrequest } from "../model/Hospitalrequest.js";
import { Orderedblood } from "../model/Orderedblood.js";
import { Store } from "../model/Store.js";

function getDistanceKm(lat1, lon1, lat2, lon2) {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in KM

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

export const bloodRequest = TryCatch(async (req, res) => {
    const { BloodType, bloodgrp, unit, user } = req.body;

    const hospital = await Hospital.findOne({id: user._id});
    if (hospital === null) {
        return res.status(404).json({ success: false, message: "Hospital not found" });
    }

    const bloodBanks = await Blood_bank.find().populate("status"); // status contains Store reference

    let nearestBank = null;
    let minDistance = Infinity;

    for (const bank of bloodBanks) {
        const { latitude, longitude } = bank.location;
        const distance = getDistanceKm(
            hospital.location.latitude,
            hospital.location.longitude,
            latitude,
            longitude
        );

        const store = await Store.findOne({ id: bank.id });

        if (store && store[BloodType] >= unit && distance < minDistance) {
            nearestBank = { bank, store, distance };
            minDistance = distance;
        }
    }

    if (!nearestBank) {
        return res.status(404).json({ success: false, message: "No nearby blood bank with sufficient units" });
    }


    let bloodbankdonate = await Bloodbankdonate.create({
        id: nearestBank.bank.id,
        hospital_id: hospital.id,
        branch: hospital.center,
        phone: hospital.phone,
        address: hospital.address,
        unit,
        bloodgrp,
        state: "Pending",
    });


    let hospitalrequest = await Hospitalrequest.create({
        id: hospital.id,
        bloodbank_id: nearestBank.bank.id,
        branch: nearestBank.bank.branch,
        phone: nearestBank.bank.phone,
        address: nearestBank.bank.address,
        unit,
        bloodgrp,
        state: "Pending",
    });

    return res.status(200).json({
        success: true,
        message: "Request sent to nearest blood bank",
    });
});


export const updateBlooddonate = TryCatch( async(req,res) => {
    const { donorId } = req.body;
    try {
        let bloodbankdonate = await Bloodbankdonate.findById(donorId);
        let hospitalrequest = await Hospitalrequest.findOne({id: bloodbankdonate.hospital_id});
        let store = await Store.findOne({id: bloodbankdonate.id});
        let orderedblood = await Orderedblood.findOne({id: bloodbankdonate.id});
        
        if(bloodbankdonate) {
            bloodbankdonate.state = "Accepted";
        }

        await bloodbankdonate.save();

        if(hospitalrequest) {
            hospitalrequest.state = "Accepted";
        }
        await hospitalrequest.save();

        if(store) {
            switch (bloodbankdonate.bloodgrp) {
                case "A+ve":
                    store.A_positive -= bloodbankdonate.unit;
                    if(orderedblood){
                        orderedblood.A_positive += unit;
                    } else {
                        orderedblood = new Orderedblood({
                        id: store.id,
                        A_positive: bloodbankdonate.unit,
                    });
                    }
                    break;
                case "B+ve":
                    store.B_positive -= bloodbankdonate.unit;
                    if(orderedblood){
                        orderedblood.B_positive += unit;
                    } else {
                        orderedblood = new Orderedblood({
                        id: store.id,
                        B_positive: bloodbankdonate.unit,
                    });
                    }
                    
                    break;
                case "A-ve":
                    store.A_negative -= bloodbankdonate.unit;
                    if(orderedblood) {
                        orderedblood.A_negative += unit;
                    } else {
                        orderedblood = new Orderedblood({
                        id: store.id,
                        A_negative: bloodbankdonate.unit,
                    });
                    }
                    
                    break;
                case "B-ve":
                    store.B_negative -= bloodbankdonate.unit;
                    if(orderedblood) {
                        orderedblood.B_negative += unit;
                    } else {
                        orderedblood = new Orderedblood({
                        id: store.id,
                        B_negative: bloodbankdonate.unit,
                    });
                    }
                    
                    break;
                case "AB+ve":
                    store.AB_positive -= bloodbankdonate.unit;
                    if(orderedblood) {
                        orderedblood.AB_positive += unit;
                    } else {
                        orderedblood = new Orderedblood({
                        id: store.id,
                        AB_positive: bloodbankdonate.unit,
                    });
                    }
                    
                    break;
                case "AB-ve":
                    store.AB_negative -= bloodbankdonate.unit;
                    if(orderedblood) {
                        orderedblood.AB_negative += unit;
                    } else {
                        orderedblood = new Orderedblood({
                        id: store.id,
                        AB_negative: bloodbankdonate.unit,
                    });
                    }
                    
                    break;
                case "O+ve":
                    
                    store.O_positive -= bloodbankdonate.unit;
                    if(orderedblood) {
                        orderedblood.O_positive += unit;
                    } else {
                        orderedblood = new Orderedblood({
                        id: store.id,
                        O_positive: bloodbankdonate.unit,
                    });
                    }
                    
                    break;
                case "O-ve":
                    store.O_negative -= bloodbankdonate.unit;
                    if(orderedblood) {
                        orderedblood.O_negative += unit;
                    } else {
                        orderedblood = new Orderedblood({
                        id: store.id,
                        O_negative: bloodbankdonate.unit,
                    });
                    }
                    
                    break;
                default:
                    break;
            }
        }
        else {
            console.log("error in updating store");
        }
        await store.save();
        await orderedblood.save();
        res.json({bloodbankdonate});
    } catch (error) {
        console.log(error);
    }
});

export const UpdateHospitalrequest = TryCatch(async(req,res) => {
    const { donorId } = req.body;
    try {
        
        let hospitalrequest = await Hospitalrequest.findById(donorId);
        let bloodbankdonate = await Bloodbankdonate.findOne({id: hospitalrequest.bloodbank_id});

        if(hospitalrequest) {
            hospitalrequest.state = "Completed";
        }
        await hospitalrequest.save();

        if(bloodbankdonate) {
            bloodbankdonate.state = "Completed";
        }
        await bloodbankdonate.save();
        res.json({hospitalrequest});
    }
    catch (error) {
        console.log(error);
    }
})

