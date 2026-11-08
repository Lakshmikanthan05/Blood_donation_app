import sendMail from "../middleware/sendMail.js";
import TryCatch from "../middleware/TryCatch.js";
import { User } from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Checkemail = TryCatch(async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "No User with this email",
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);

    user = {
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



    await sendMail(email, "Reset password OTP", otp);

    res.status(200).json({
        message: "Otp send to your mail",
        activationToken,
    });
    } 
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error...." });
    }
})