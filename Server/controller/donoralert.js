import TryCatch from "../middleware/TryCatch.js";
import { Donor } from "../model/Donor.js";
import { Donoralert } from "../model/Donoralert.js";
import { Newstock } from "../model/Newstock.js";
import { Store } from "../model/Store.js";

export const donorAlert = TryCatch(async (req, res) => {
    const { bloodgrp } = req.body;
    const alertdata = await Donor.find({ bloodgrp });
    res.json({ alertdata });
});

export const updateDonoralert = TryCatch(async (req, res) => {
    const { alerts,  bloodGroup} = req.body;
    
    try {
        const results = await Donoralert.insertMany(alerts);
        res.status(200).json({
        success: true,
        message: `Alerts added for ${bloodGroup}`,
        inserted: results.length,
        });
    } catch (error) {
        console.error("Error inserting donor alerts:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

export const confrimDonoralert = TryCatch(async (req, res) => {
    const { status, user } = req.body;
    try {
        const donoralert = await Donoralert.findOne({ id: user._id });

        if (donoralert) {
        donoralert.state = status;
        await donoralert.save(); 
        return res.status(200).json({ message: "Donor alert updated successfully", donoralert });
        } else {
        return res.status(404).json({ message: "Donor alert not found" });
        }
    } catch (error) {
        console.error("Error updating donor alert:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export const accessAccepteddonor = TryCatch(async(req,res) =>{
    const userId = req.query.id;
    try {
        const acceptedAlerts = await Donoralert.find({
        branch_id: userId,
        state: "Accepted",
        });

        const donorIds = acceptedAlerts.map(alert => alert.id);

        const donors = await Donor.find({ id: { $in: donorIds } });

        res.status(200).json({ donors });
    } catch (error) {
        console.error("Error accessing accepted donors:", error);
        res.status(500).json({ message: "Server error" });
    }
})

export const donoationComplete = TryCatch( async(req,res)=> {
    const { donorId, unit, bloodbankdetail, } = req.body;
    
    try {
        let donoralert = await Donoralert.findOne({id: donorId});

        if(donoralert) {
            donoralert.state = "Donated";
        }

        await donoralert.save();

        let donor = await Donor.findOne({id: donorId});

        if(donor) {
            donor.isEligible = false;
            donor.lastdonate = new Date();
        }

        await donor.save();
        res.json({donoralert});
    } catch (error) {
        console.error("Error updating donor alert:", error);
        res.status(500).json({ message: "Internal server error" });
    }

    try {

        
        let store = await Store.findOne({ id: bloodbankdetail.id});
        console.log(store);
        let donor = await Donor.findOne({ id: donorId});
        let newstock = await Newstock.findOne({ id: bloodbankdetail.id});
        const group = donor.bloodgrp;
        const num = parseInt(unit);
        
        if(store) {
            switch (group) {
                case "A+ve":
                    store.A_positive += num;
                    break;
                case "B+ve":
                    store.B_positive += num;
                    break;
                case "A-ve":
                    store.A_negative += num;
                    break;
                case "B-ve":
                    store.B_negative += num;
                    break;
                case "AB+ve":
                    store.AB_positive += num;
                    break;
                case "AB-ve":
                    store.AB_negative += num;
                    break;
                case "O+ve":
                    
                    store.O_positive += num;
                    
                    break;
                case "O-ve":
                    store.O_negative += num;
                    break;
                default:
                    break;
            }
        }
        else {
            console.log("error in updating store");
        }
        await store.save();

        if(newstock === null){
            newstock = new Newstock({
                id: bloodbankdetail.id,
                donor_id: donorId,
                name: donor.name,
                age: donor.age,
                phone: donor.phone,
                bloodgrp: donor.bloodgrp,
                address: donor.address,
                unit: unit,
            });
        }

        await newstock.save();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error.." });
    }
})