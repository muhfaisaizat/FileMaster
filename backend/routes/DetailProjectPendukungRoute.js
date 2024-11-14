// routes/detailProjectPendukungRoutes.js
const express = require('express');
const router = express.Router();
const detailProjectPendukungController = require('../controllers/DetailProjectPendukungController');
const upload = require('../middleware/uploadFile'); // Middleware for file upload

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
 *     summary: Create a new DetailProjectPendukung entry
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
 *               pekerjaan:
 *                 type: string
 *                 enum: [F1, F2, F3, F4]
 *                 description: Type of pekerjaan
 *               other_file:
 *                 type: string
 *                 description: Additional file type based on pekerjaan
 *                 enum: ['Form F3.pdf', 'Form F3.docx', 'Gambar.pdf', 'Analisa Struktur.pdf', 'Spek Teknis.pdf', 'Perhitungan Air Hujan.pdf', 'Perhitungan Air Bersih.pdf', 'Perhitungan Air Kotor.pdf', 'Kajian dan Simak (SLF).pdf']
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file for the detail project pendukung
 *     responses:
 *       201:
 *         description: DetailProjectPendukung created successfully
 *       400:
 *         description: Invalid request
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
 * /api/detail-project-pendukung/{id_project}:
 *   put:
 *     summary: Update the file for a specific DetailProjectPendukung entry by project ID, other_file, and pekerjaan
 *     tags: [DetailProjectPendukung]
 *     parameters:
 *       - in: path
 *         name: id_project
 *         required: true
 *         description: The ID of the project
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pekerjaan
 *         required: true
 *         description: The type of pekerjaan (F1, F2, F3, F4)
 *         schema:
 *           type: string
 *           enum: [F1, F2, F3, F4]
 *       - in: query
 *         name: other_file
 *         required: true
 *         description: The additional file related to the project
 *         schema:
 *           type: string
 *           enum: ['Form F3.pdf', 'Form F3.docx', 'Gambar.pdf', 'Analisa Struktur.pdf', 'Spek Teknis.pdf', 'Perhitungan Air Hujan.pdf', 'Perhitungan Air Bersih.pdf', 'Perhitungan Air Kotor.pdf', 'Kajian dan Simak (SLF).pdf']
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
 *     responses:
 *       200:
 *         description: DetailProjectPendukung file updated successfully
 *       404:
 *         description: DetailProjectPendukung not found
 *       400:
 *         description: Error updating DetailProjectPendukung
 */
router.put('/:id', upload, detailProjectPendukungController.updateDetailProjectPendukung);

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
