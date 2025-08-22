const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'abdulsaboor5059@gmail.com', // Replace with your email
        pass: 'fzxy yauu ldoj yprd'   // Replace with your app password
    }
  });

// Function to send OTP
const sendOtp = async (email, otpCode) => {
    // console.log("callOpt");
    const mailOptions = {
        from: 'abdulsaboor5059@gmail.com',
        to: "abdul.saboor.dev@gmail.com",
        subject: 'Admin OTP Verification',
        text: `Your OTP code is: ${otpCode}`,
        html: `<b>Your OTP code is: ${otpCode}</b>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("OTP sent successfully!");
    } catch (error) {
        console.error("Error sending OTP:", error);
    }
};

module.exports = sendOtp;
