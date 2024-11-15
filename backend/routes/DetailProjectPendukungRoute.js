// routes/detailProjectPendukungRoutes.js
const express = require('express');
const router = express.Router();
const detailProjectPendukungController = require('../controllers/DetailProjectPendukungController');
const upload = require('../middleware/uploadFile'); // Middleware for file upload
const gantifile = require('../middleware/gantiFile'); 

/**
 * @swagger
 * tags:
 *   name: DetailProjectPendukung
 *   description: API for managing detail project pendukung entries
 */

/**
 * @swagger
 * /api/detail-project-pendukung:
 *   post:
 *     summary: Create a new DetailProjectPendukung entry for a project
 *     tags: [DetailProjectPendukung]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id_project:
 *                 type: integer
 *                 description: The ID of the project
 *                 example: 1
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File to be uploaded
 *     responses:
 *       201:
 *         description: DetailProjectPendukung created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: DetailProjectPendukung created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_project_pendukung:
 *                       type: integer
 *                       example: 1
 *                     id_project:
 *                       type: integer
 *                       example: 1
 *                     file:
 *                       type: string
 *                       example: uploaded-file.pdf
 *                     other_file:
 *                       type: string
 *                       example: original-file.pdf
 *                     pekerjaan:
 *                       type: string
 *                       example: file pendukung
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.post('/', upload, detailProjectPendukungController.createDetailProjectPendukung);


/**
 * @swagger
 * /api/detail-project-pendukung:
 *   get:
 *     summary: Get all DetailProjectPendukung entries
 *     tags: [DetailProjectPendukung]
 *     responses:
 *       200:
 *         description: A list of detail project pendukung entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_project_pendukung:
 *                     type: integer
 *                   id_project:
 *                     type: integer
 *                   file:
 *                     type: string
 *                   pekerjaan:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/', detailProjectPendukungController.getAllDetailProjectPendukung);

/**
 * @swagger
 * /api/detail-project-pendukung/{id}:
 *   get:
 *     summary: Get a DetailProjectPendukung entry by ID
 *     tags: [DetailProjectPendukung]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the detail project pendukung
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: DetailProjectPendukung found
 *       404:
 *         description: DetailProjectPendukung not found
 */
router.get('/:id', detailProjectPendukungController.getDetailProjectPendukungById);

/**
 * @swagger
 * /api/detail-project-pendukung/{id}:
 *   put:
 *     summary: Update the file for a specific DetailProjectUtama entry by project ID, other_file, and pekerjaan
 *     tags: [DetailProjectPendukung]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the detail project pendukung
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: New file to update for the detail project pendukung
 *               oldFileName:
 *                 type: string
 *                 description: The old file name (optional)
 *     responses:
 *       200:
 *         description: DetailProjectPendukung file updated successfully
 *       404:
 *         description: DetailProjectPendukung not found
 *       400:
 *         description: Error updating DetailProjectPendukung
 */
router.put('/:id', gantifile, detailProjectPendukungController.updateDetailProjectPendukung);

/**
 * @swagger
 * /api/detail-project-pendukung/{id}:
 *   delete:
 *     summary: Delete detail project pendukung by ID
 *     tags: [DetailProjectPendukung]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the detail project pendukung
 *     responses:
 *       200:
 *         description: detail project pendukung deleted successfully
 *       404:
 *         description: detail project pendukung not found
 *       500:
 *         description: Error deleting detail project pendukung
 */
router.delete('/:id', detailProjectPendukungController.deleteDetailProjectPendukung);

module.exports = router;
