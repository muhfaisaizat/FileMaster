const LogAktivitas = require('../models/LogAktivitas');
const sequelize = require('../config/database');

// Controller for LogAktivitas
class LogAktivitasController {
    static async create(req, res) {
        try {
            const project = await LogAktivitas.create(req.body);

            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: 'Error creating project' });
            }
        } catch (error) {
            console.error("Error creating project:", error);
            res.status(500).json({ message: 'Error creating project', error: error.message });
        }
    }
    static async getLogAktivitas(req, res) {
        const { id } = req.params;
        try {
            const get = await sequelize.query(`
                SELECT 
                    logaktivitas.id, 
                    logaktivitas.id_project, 
                    logaktivitas.id_user, 
                    users.name, 
                    users.image, 
                    logaktivitas.aktivitas, 
                    CONCAT(projects.nama_project, 
                        CASE 
                            WHEN logaktivitas.keterangan IS NOT NULL AND logaktivitas.keterangan != '' 
                            THEN CONCAT(' – ', logaktivitas.keterangan) 
                            ELSE '' 
                        END) AS project_with_keterangan,
                    DATE_FORMAT(logaktivitas.createdAt, '%d %b %Y, %H.%i') AS formatted_createdAt
                FROM 
                    logaktivitas
                JOIN 
                    users ON logaktivitas.id_user = users.id
                JOIN 
                    projects ON logaktivitas.id_project = projects.id_project
                WHERE logaktivitas.id_project = ${id}  AND logaktivitas.deletedAt IS NULL
                ORDER BY 
                 logaktivitas.createdAt DESC
            `);
            
            // Check if data exists, otherwise return null
            if (get && get[0].length > 0) {
                res.status(200).json(get[0]); // Return the result if found
            } else {
                res.status(200).json(null); // Return null if no data found
            }
        } catch (error) {
            console.error('Error fetching logs:', error);
            res.status(500).json({ message: 'Failed to retrieve logs', error: error.message });
        }
    }

    static async deleteLog(req, res) {
        try {
            const deleted = await LogAktivitas.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                res.status(200).json({ message: 'Log deleted' });
            } else {
                res.status(404).json({ message: 'Log not found' });
            }
        } catch (error) {
            console.error("Error deleting Log:", error);
            res.status(500).json({ message: 'Error deleting Log', error: error.message });
        }
    }
    
}

module.exports = LogAktivitasController;
