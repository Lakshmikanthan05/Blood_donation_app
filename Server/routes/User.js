import express from 'express';
import { editBloodbank, editDonor, editHospital, loginUser, myProfile, register, verifyUser } from '../controller/User.js';
import { isAuth } from '../middleware/isAuth.js';
import { accessAccepteddonor, confrimDonoralert, donoationComplete, donorAlert, updateDonoralert } from '../controller/donoralert.js';
import { bloodRequest, updateBlooddonate, UpdateHospitalrequest } from '../controller/BloodRequest.js';
import { Checkemail } from '../controller/Forgetprocess.js';

const router = express.Router();

router.post("/user/register", register);
router.post("/user/login", loginUser);
router.post("/user/verify", verifyUser);
router.post("/donor/edit", isAuth, editDonor);
router.get("/user/me", isAuth, myProfile);
router.post("/hospital/edit", isAuth, editHospital);
router.post("/bloodbank/edit", isAuth, editBloodbank);
router.post("/donors", isAuth, donorAlert);
router.post("/alerts/send",isAuth, updateDonoralert);
router.post("/alerts/confirm", confrimDonoralert);
router.get("/donors/accepted", isAuth, accessAccepteddonor);
router.post("/donors/donated", isAuth, donoationComplete);
router.post("/bloodrequest", isAuth, bloodRequest);
router.post("/updatebloodbankdonate", isAuth, updateBlooddonate);
router.post("/updatehospitalrequest", isAuth, UpdateHospitalrequest);
router.post("/checkemail", Checkemail);
export default router;