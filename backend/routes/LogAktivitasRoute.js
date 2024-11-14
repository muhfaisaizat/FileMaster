const express = require('express');
const router = express.Router();
const logAktivitasController = require('../controllers/LogAktivitasController');
const roleMiddleware = require('../middleware/roleMiddleware');



/**
 * @swagger
 * /api/log-aktivitas/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [LogAktivitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the project
 *     responses:
 *       200:
 *         description: List of all log entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LogAktivitas'
 */
router.get('/:id',roleMiddleware(['Admin', 'Manager', 'Kasir']), logAktivitasController.getLogAktivitas);

/**
 * @swagger
 * /api/log-aktivitas:
 *   post:
 *     summary: Create a new log entry
 *     tags: [LogAktivitas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_project:
 *                 type: integer
 *                 description: ID of the related project
 *                 example: 1
 *               id_user:
 *                 type: integer
 *                 description: ID of the related user
 *                 example: 1
 *               aktivitas:
 *                 type: string
 *                 description: Description of the activity
 *                 example: "melihat file"
 *               keterangan:
 *                 type: string
 *                 description: Additional notes for the activity
 *                 example: "Detailed review completed"
 *     responses:
 *       200:
 *         description: Log entry created successfully
 *       500:
 *         description: Failed to create log entry
 */
router.post('/', roleMiddleware(['Admin', 'Manager', 'Kasir']), logAktivitasController.create);


/**
 * @swagger
 * /api/log-aktivitas/{id}:
 *   delete:
 *     summary: Delete Log by ID
 *     tags: [LogAktivitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Log
 *     responses:
 *       200:
 *         description: Log deleted successfully
 *       404:
 *         description: Log not found
 *       500:
 *         description: Error deleting Log
 */
router.delete('/:id', roleMiddleware(['Admin', 'Manager', 'Kasir']), logAktivitasController.deleteLog);


module.exports = router;
