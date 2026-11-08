import { User } from "../model/User.js"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middleware/sendMail.js";
import TryCatch from "../middleware/TryCatch.js";
import { Donor } from "../model/Donor.js";
import mongoose from "mongoose";
import { Hospital } from "../model/Hospital.js";
import { Blood_bank } from "../model/Blood_bank.js";
import { Store } from "../model/Store.js";
import { Donoralert } from "../model/Donoralert.js";
import { Bloodbankdonate } from "../model/Bloodbankdonate.js";
import { Hospitalrequest } from "../model/Hospitalrequest.js";

export const register = TryCatch(async (req, res) => {
  const {role, email, password } = req.body;
  console.log(`${role},${email}`);
  let user = await User.findOne({ email });

  if (user)
    return res.status(400).json({
      message: "User Already exists",
    });

  const hashPassword = await bcrypt.hash(password, 10);

  user = {
    role,
    email,
    password: hashPassword,
  };

  const otp = Math.floor(Math.random() * 1000000);

  const activationToken = jwt.sign(
    {
      user,
      otp
    },
    process.env.Activation_Secret,
    {
      expiresIn: "5m",
    }
  );



  await sendMail(email, "OTP verificaton", otp);

  res.status(200).json({
    message: "Otp send to your mail",
    activationToken,
  });
});

export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;

  const verify = jwt.verify(activationToken, process.env.Activation_Secret);

  if (!verify)
    return res.status(400).json({
      message: "Otp Expired",
    });

  if (verify.otp !== otp)
    return res.status(400).json({
      message: "Wrong Otp",
    });

  if(verify.user.role) {
    await User.create({
      role: verify.user.role,
      email: verify.user.email,
      password: verify.user.password,
    });
  }
  else {
    let users = await User.findOne({email: verify.user.email});
    if(users) {
      users.password = verify.user.password;
    }
    await users.save();
  }

  res.json({
    message: "User Registered",
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: "No User with this email",
    });

  const mathPassword = await bcrypt.compare(password, user.password);

  if (!mathPassword)
    return res.status(400).json({
      message: "wrong Password",
    });

  const token = jwt.sign({ _id: user._id }, process.env.Jwt_Sec, {
    expiresIn: "15d",
  });

  res.json({
    message: `Welcome back ${user.name}`,
    token,
    user,
  });
});

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  let donordetail = await Donor.findOne({ id: req.user._id });
  let hospitaldetail = await Hospital.findOne({ id: req.user._id});
  let bloodbankdetail = await Blood_bank.findOne({ id: req.user._id});
  let storedetail = await Store.findOne({ id: req.user._id});
  let donoralertdetail = await Donoralert.find({ id: req.user._id});
  let bloodbankdonate = await Bloodbankdonate.find({ id : req.user._id});
  let hospitalrequest = await Hospitalrequest.find({ id: req.user._id});
  let donorhistory = await Donoralert.find({id: req.user._id, state: "Donated"});


  res.json({ user, donordetail: donordetail || null , hospitaldetail: hospitaldetail || null, 
    bloodbankdetail: bloodbankdetail || null, storedetail: storedetail || null,
    donoralertdetail: donoralertdetail || null, bloodbankdonate: bloodbankdonate || null, 
    hospitalrequest: hospitalrequest || null, donorhistory: donorhistory || null });
});

export const editDonor = TryCatch(async (req, res) => {
    const { name, age, phone, gender, bloodgrp, address, user } = req.body;
    const userId = user._id; 

    
    let existingUser = await User.findById(userId);
    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }

    
    let donor = await Donor.findOne({ id: userId });

    if (donor) {
        
        donor.name = name;
        donor.age = age;
        donor.phone = phone;
        donor.bloodgrp = bloodgrp;
        donor.address = address;
        donor.gender = gender;
    } else {
        
        donor = new Donor({
            id: userId, 
            name,
            age,
            phone,
            bloodgrp,
            address,
            gender,
        });

        existingUser.detail.push(donor._id);
    }

    await donor.save();
    await existingUser.save();

    res.status(200).json({ message: "Donor details updated successfully", donor });
});

export const editHospital = TryCatch(async (req, res) => {
    const { center, phone, address, markerPosition, user } = req.body;
    const userId = user._id; 

    
    let existingUser = await User.findById(userId);
    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }

    
    let hospital = await Hospital.findOne({ id: userId });

    if (hospital) {
        
        hospital.center = center;
        hospital.phone = phone;
        hospital.address = address;
        hospital.location.latitude = markerPosition.lat;
        hospital.location.longitude = markerPosition.lng;
    } else {
        
        hospital = new Hospital({
            id: userId, 
            center,
            phone,
            address,
            location: {
              latitude: markerPosition.lat,
              longitude: markerPosition.lng,
            },
        });

        existingUser.detail.push(hospital._id);
    }

    await hospital.save();
    await existingUser.save();

    res.status(200).json({ message: "Donor details updated successfully", hospital });
});

export const editBloodbank = TryCatch(async (req, res) => {
    const { branch, phone, address, markerPosition, user } = req.body;
    const userId = user._id; 

    
    let existingUser = await User.findById(userId);
    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }

    
    let bloodbank = await Blood_bank.findOne({ id: userId });
    let store = await Store.findOne({ id: userId });


    if (bloodbank) {
        
        bloodbank.branch = branch;
        bloodbank.phone = phone;
        bloodbank.address = address;
        bloodbank.location.latitude = markerPosition.lat;
        bloodbank.location.longitude = markerPosition.lng;
    } else {
        
        bloodbank = new Blood_bank({
            id: userId, 
            branch,
            phone,
            address,
            location: {
              latitude: markerPosition.lat,
              longitude: markerPosition.lng,
            },

        });
        store = new Store({
          id: userId,
        })
        bloodbank.status.push(store._id);
        await store.save();
        existingUser.detail.push(bloodbank._id);
    }



    await bloodbank.save();
    await existingUser.save();


    res.status(200).json({ message: "Donor details updated successfully", bloodbank });
});