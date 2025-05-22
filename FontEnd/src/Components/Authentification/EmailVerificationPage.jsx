import React, { useState } from "react";
import { Box, TextField, Link } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import FullLogo from "../../assets/fullLogo.svg";
import { verifyEmail } from "../../Redux/Actions/Auth.action";

const EmailVerificationPage = () => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(["", "", "", ""]);

  // Gestion du changement dans les champs OTP
  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) { // Vérifie si c'est un chiffre
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Passage automatique à la case suivante
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  // Vérification de l'OTP
  const confirm = async () => {
    const otpCode = otp.join("");
    
    if (otpCode.length !== 4) {
      toast.error("Veuillez entrer un code valide !");
      return;
    }

    try {
      await dispatch(verifyEmail(otpCode));
      toast.success("Email vérifié avec succès !");
    } catch (error) {
      toast.error("Échec de la vérification. Vérifiez votre code.");
    }
  };

  return (
    <div className="d-flex split-container">
      {/* Left Side */}
      <div className="left-panel d-flex flex-column justify-content-center align-items-center panel-with-image">
        <div className="logo-ath-container">
          <img src={FullLogo} alt="totalis-logo" />
        </div>
        <h1 className="auth-title">Sign up to Totalis</h1>
        <p className="auth-subtitle">Enter your personal details and start your adventure with us</p>
        <button className="secondary-button-auth px-4 py-2">Registration</button>
      </div>

      {/* Right Side */}
      <div className="right-panel d-flex flex-column justify-content-center align-items-center">
        <p className="auth-subtitle" style={{ fontWeight: "bold" }}>This is not going to take long</p>
        <p className="auth-subtitle">Thank you for signing up for Totalis! Please enter the verification code below:</p>

        {/* OTP Input */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              id={`otp-${index}`}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              variant="outlined"
              inputProps={{
                maxLength: 1,
                style: { textAlign: "center", fontSize: "20px", width: "50px" }
              }}
            />
          ))}
        </Box>

        <button className="primary-button mt-2 px-4 py-2" onClick={confirm}>
          Continue
        </button>

        <p>
          Didn’t receive the email? <Link href="#" underline="hover">Click to resend</Link>
        </p>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
