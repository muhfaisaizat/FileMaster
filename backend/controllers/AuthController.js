const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { Op } = require("sequelize");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

// Extend dayjs dengan plugin utc dan timezone
dayjs.extend(utc);
dayjs.extend(timezone);

function getAdjustedDate() {
  const currentDate = new Date();
  const timezoneOffsetMillis = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
  return new Date(currentDate.getTime() + timezoneOffsetMillis);
}

const JWT_SECRET = process.env.JWT_SECRET;

// Fungsi login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Regex untuk memvalidasi password harus huruf kapital di depan dan ada angka di belakang
  const passwordRegex = /^[A-Z].*\d$/;

  // Validasi format password
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password harus diawali dengan huruf kapital dan diakhiri dengan angka.",
    });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Bandingkan password menggunakan argon2
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Buat token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { ...user.dataValues, password: undefined }, // Hapus password dari response
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Fungsi Forgot Password
exports.forgotPassword = async (req, res) => {
  console.log("Forgot password request received:", req.body);
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate the reset password URL with userId in the query string
    const resetUrl = `http://localhost:5000/api-filemaster/docs#/Auth/post_api_auth_reset_password?userId=${user.id}`;

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // GMAIL user
        pass: process.env.EMAIL_PASS, // GMAIL password
      },
    });

    await transporter.sendMail({
      from: `"File Master" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset. Please use the following link to reset your password: <a href="${resetUrl}">Reset Password</a></p>`,
    });

    res.status(200).json({ message: "Reset link sent to email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Fungsi Reset Password
exports.resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { userId } = req.query;  // Ambil userId dari query string

  const passwordRegex = /^[A-Z].*\d$/;

  // Validasi password baru
  if (!passwordRegex.test(newPassword)) {
    return res.status(400).json({
      message:
        "Password harus diawali dengan huruf kapital dan diakhiri dengan angka.",
    });
  }

  try {
    // Cari user berdasarkan userId
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    const hashedPassword = await argon2.hash(newPassword);

    await User.update({ password: hashedPassword }, { where: { id: user.id } });

    res.status(200).json({ message: "Password berhasil direset." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};

exports.lupaPassword = async (req, res) => {
  const { email, newPassword } = req.body;



  try {

    const passwordRegex = /^[A-Z].*\d$/;

    // Validasi password baru
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password harus diawali dengan huruf kapital dan diakhiri dengan angka.",
      });
    }
    
      // Check if email is provided
      if (!email || !newPassword) {
          return res.status(400).json({ message: "Email and new password are required." });
      }

      // Find user by email
      const user = await User.findOne({ where: { email: email } });

      if (!user) {
          return res.status(404).json({ message: "User not found." });
      }

      // Hash the new password
      const hashedPassword = await argon2.hash(newPassword, 10);

      // Update user's password in the database
      user.password = hashedPassword;
      user.ResetPasswordToken = null; // Clear the reset token after successful reset
      user.ResetTokenExpires = null;  // Clear the token expiration time
      await user.save();

      // Send success response
      res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: "Failed to reset password.", error: error.message });
  }
}