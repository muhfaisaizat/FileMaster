const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/ProjectController');

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama_project:
 *                 type: string
 *                 example: Persiapan Bangun PT Indomaret
 *               kategori:
 *                 type: string
 *                 example: Persiapan Bangun
 *               deskripsi:
 *                 type: string
 *                 example: Penjelasan deskripsi proyek singkat
 *               nama_pengaju_project:
 *                 type: string
 *                 example: Nurmaningtiyas
 *               jabatan:
 *                 type: string
 *                 example: Manager
 *               instansi_organisasi:
 *                 type: string
 *                 example: PT Indomaret
 *               no_telp:
 *                 type: string
 *                 example: 89230493210
 *               alamat_lengkap:
 *                 type: string
 *                 example: Jl langka, dusun baru Keramik merah
 *               provinsi:
 *                 type: string
 *                 example: Jawa Timur
 *               kabupaten_kota:
 *                 type: string
 *                 example: Tulungagung
 *               kecamatan:
 *                 type: string
 *                 example: Tulungagung
 *               kelurahan_desa:
 *                 type: string
 *                 example: Pakel
 *     responses:
 *       201:
 *         description: Project created successfully
 *       500:
 *         description: Error creating project
 */
router.post('/', ProjectController.createProject);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of projects
 *       500:
 *         description: Error fetching projects
 */
router.get('/', ProjectController.getAllProjects);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the project
 *     responses:
 *       200:
 *         description: Project data
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error fetching project
 */
router.get('/:id', ProjectController.getProjectById);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama_project:
 *                 type: string
 *               kategori:
 *                 type: string
 *               deskripsi:
 *                 type: string
 *               nama_pengaju_project:
 *                 type: string
 *               jabatan:
 *                 type: string
 *               instansi_organisasi:
 *                 type: string
 *               no_telp:
 *                 type: string
 *               alamat_lengkap:
 *                 type: string
 *               provinsi:
 *                 type: string
 *               kabupaten_kota:
 *                 type: string
 *               kecamatan:
 *                 type: string
 *               kelurahan_desa:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error updating project
 */
router.put('/:id', ProjectController.updateProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the project
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error deleting project
 */
router.delete('/:id', ProjectController.deleteProject);

module.exports = router;
