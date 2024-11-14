const express = require("express");
const {
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/AuthController.js");
const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid password
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to login
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request a password reset link
 *     description: Sends a password reset link to the user's email.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@gmail.com
 *     responses:
 *       200:
 *         description: Reset link sent to email.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
router.post("/forgot-password", forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset the user's password
 *     description: Resets the user's password using the provided new password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: Newpassword123
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: 123
 *     responses:
 *       200:
 *         description: Password berhasil direset.
 *       400:
 *         description: Format password tidak valid.
 *       404:
 *         description: User tidak ditemukan.
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.post('/reset-password', resetPassword);

module.exports = router;
