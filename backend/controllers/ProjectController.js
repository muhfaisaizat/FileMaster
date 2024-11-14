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
                    projects.deskripsi AS \`Deskripsi\`,
                    projects.nama_pengaju_project AS \`Nama Pengaju\`,
                    projects.jabatan AS \`Jabatan\`,
                    projects.instansi_organisasi AS \`Instansi/Organisasi\`,
                    projects.no_telp AS \`No Telp\`,
                    projects.alamat_lengkap AS \`Alamat Lengkap\`,
                    projects.provinsi AS \`Provinsi\`,
                    projects.kabupaten_kota AS \`Kabupaten/Kota\`,
                    projects.kecamatan AS \`Kecamatan\`,
                    projects.kelurahan_desa AS \`Kelurahan/Desa\`,
                    projects.archive AS \`Archive\`,
                    projects.createdAt AS \`Date\`,
                    projects.updatedAt AS \`Aktivitas\`,
                    GROUP_CONCAT(DISTINCT detailprojectutamas.pekerjaan ORDER BY detailprojectutamas.pekerjaan ASC SEPARATOR ', ') AS \`Progres\`
                FROM 
                    projects
                LEFT JOIN 
                    detailprojectutamas ON detailprojectutamas.id_project = projects.id_project
                WHERE 
                    projects.deletedAt IS NULL
                GROUP BY 
                    projects.id_project,
                    projects.nama_project,
                    projects.kategori,
                    projects.deskripsi,
                    projects.nama_pengaju_project,
                    projects.jabatan,
                    projects.instansi_organisasi,
                    projects.no_telp,
                    projects.alamat_lengkap,
                    projects.provinsi,
                    projects.kabupaten_kota,
                    projects.kecamatan,
                    projects.kelurahan_desa,
                    projects.archive,
                    projects.createdAt,
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
                    projects.deskripsi AS \`Deskripsi\`,
                    projects.nama_pengaju_project AS \`Nama Pengaju\`,
                    projects.jabatan AS \`Jabatan\`,
                    projects.instansi_organisasi AS \`Instansi/Organisasi\`,
                    projects.no_telp AS \`No Telp\`,
                    projects.alamat_lengkap AS \`Alamat Lengkap\`,
                    projects.provinsi AS \`Provinsi\`,
                    projects.kabupaten_kota AS \`Kabupaten/Kota\`,
                    projects.kecamatan AS \`Kecamatan\`,
                    projects.kelurahan_desa AS \`Kelurahan/Desa\`,
                    projects.archive AS \`Archive\`,
                    projects.createdAt AS \`Date\`,
                    projects.updatedAt AS \`Aktivitas\`,
                    GROUP_CONCAT(DISTINCT detailprojectutamas.pekerjaan ORDER BY detailprojectutamas.pekerjaan ASC SEPARATOR ', ') AS \`Progres\`
                FROM 
                    projects
                LEFT JOIN 
                    detailprojectutamas ON detailprojectutamas.id_project = projects.id_project
                WHERE 
                    projects.deletedAt IS NULL
                GROUP BY 
                    projects.id_project,
                    projects.nama_project,
                    projects.kategori,
                    projects.deskripsi,
                    projects.nama_pengaju_project,
                    projects.jabatan,
                    projects.instansi_organisasi,
                    projects.no_telp,
                    projects.alamat_lengkap,
                    projects.provinsi,
                    projects.kabupaten_kota,
                    projects.kecamatan,
                    projects.kelurahan_desa,
                    projects.archive,
                    projects.createdAt,
                    projects.updatedAt
                ORDER BY 
                    projects.id_project;
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

    static async updateProjectArchive(req, res) {
        try {
            // Ambil id_project dari req.params dan konversikan ke integer
            const projectId = parseInt(req.params.id, 10);
            const newArchive = req.query.archive;
    
            // Validasi jika projectId bukan angka atau NaN
            if (isNaN(projectId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid project ID. Project ID must be an integer."
                });
            }
    
            // Validasi nilai archive harus 'Aktif' atau 'Achive'
            if (!['Aktif', 'Arsip'].includes(newArchive)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid archive value. Allowed values are 'Aktif' or 'Arsip'."
                });
            }
    
            // Update archive status dari project
            const [updated] = await Project.update(
                { archive: newArchive },
                { where: { id_project: projectId } }
            );
    
            if (updated) {
                // Dapatkan informasi Project setelah update
                const updatedProject = await Project.findOne({
                    where: { id_project: projectId },
                    attributes: ['id_project', 'nama_project', 'kategori', 'archive']
                });
    
                return res.status(200).json({
                    success: true,
                    message: `Project archive updated to ${newArchive}`,
                    data: updatedProject
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Project not found"
                });
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "An error occurred while updating project archive",
                error: error.message
            });
        }
    }
    
}

module.exports = ProjectController;
