const Project = require('../models/Project');
const moment = require('moment-timezone');
const sequelize = require('../config/database');

class ProjectController {
    static async createProject(req, res) {
        try {
            const project = await Project.create(req.body);
            res.status(201).json(project);
        } catch (error) {
            console.error("Error creating project:", error);
            res.status(500).json({ message: 'Error creating project', error: error.message });
        }
    }

    static async getAllProjects(req, res) {
        try {
            const [projects, metadata] = await sequelize.query(`
                SELECT 
                    projects.id_project AS ID,
                    projects.nama_project AS \`Nama Project\`,
                    projects.kategori AS \`Kategori Project\`,
                    projects.createdAt AS \`Date\`,
                    projects.instansi_organisasi AS \`Perusahaan\`,
                    projects.updatedAt AS \`Aktivitas\`,
                    GROUP_CONCAT(DISTINCT detailprojectutamas.pekerjaan ORDER BY detailprojectutamas.pekerjaan ASC SEPARATOR ', ') AS \`Progres\`
                FROM 
                    detailprojectutamas
                JOIN 
                    projects ON detailprojectutamas.id_project = projects.id_project
                GROUP BY 
                    projects.id_project,
                    projects.nama_project,
                    projects.kategori,
                    projects.createdAt,
                    projects.instansi_organisasi,
                    projects.updatedAt
                ORDER BY 
                    projects.id_project;
            `);

            // Format tanggal menggunakan moment-timezone untuk zona waktu lokal
            const formattedProjects = projects.map(project => ({
                ...project,
                Date: moment.utc(project.Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'), // Konversi ke zona waktu Asia/Jakarta
                Aktivitas: moment.utc(project.Aktivitas).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'), // Konversi ke zona waktu Asia/Jakarta
            }));

            res.status(200).json(formattedProjects);
        } catch (error) {
            console.error("Error fetching projects:", error);
            res.status(500).json({ message: 'Error fetching projects', error: error.message });
        }
    }

    static async getProjectById(req, res) {
        const { id } = req.params;
        try {
            const [project, metadata] = await sequelize.query(`
                SELECT 
                    projects.id_project AS ID,
                    projects.nama_project AS \`Nama Project\`,
                    projects.kategori AS \`Kategori Project\`,
                    projects.createdAt AS \`Date\`,
                    projects.instansi_organisasi AS \`Perusahaan\`,
                    projects.updatedAt AS \`Aktivitas\`,
                    GROUP_CONCAT(DISTINCT detailprojectutamas.pekerjaan ORDER BY detailprojectutamas.pekerjaan ASC SEPARATOR ', ') AS \`Progres\`
                FROM 
                    detailprojectutamas
                JOIN 
                    projects ON detailprojectutamas.id_project = projects.id_project
                WHERE 
                    projects.id_project = :id
                GROUP BY 
                    projects.id_project,
                    projects.nama_project,
                    projects.kategori,
                    projects.createdAt,
                    projects.instansi_organisasi,
                    projects.updatedAt;
            `, {
                replacements: { id: id },
            });
    
            if (project.length === 0) {
                return res.status(404).json({ message: 'Project not found' });
            }
    
            // Format tanggal menggunakan moment-timezone untuk zona waktu lokal
            const formattedProject = {
                ...project[0],
                Date: moment.utc(project[0].Date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'), // Konversi ke zona waktu Asia/Jakarta
                Aktivitas: moment.utc(project[0].Aktivitas).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'), // Konversi ke zona waktu Asia/Jakarta
            };
    
            res.status(200).json(formattedProject);
        } catch (error) {
            console.error("Error fetching project by ID:", error);
            res.status(500).json({ message: 'Error fetching project by ID', error: error.message });
        }
    }
    

    static async updateProject(req, res) {
        try {
            const [updated] = await Project.update(req.body, {
                where: { id_project: req.params.id }
            });
            if (updated) {
                const updatedProject = await Project.findByPk(req.params.id);
                res.status(200).json(updatedProject);
            } else {
                res.status(404).json({ message: 'Project not found' });
            }
        } catch (error) {
            console.error("Error updating project:", error);
            res.status(500).json({ message: 'Error updating project', error: error.message });
        }
    }

    static async deleteProject(req, res) {
        try {
            const deleted = await Project.destroy({
                where: { id_project: req.params.id }
            });
            if (deleted) {
                res.status(200).json({ message: 'Project deleted' });
            } else {
                res.status(404).json({ message: 'Project not found' });
            }
        } catch (error) {
            console.error("Error deleting project:", error);
            res.status(500).json({ message: 'Error deleting project', error: error.message });
        }
    }
}

module.exports = ProjectController;
