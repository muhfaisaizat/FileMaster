const express = require("express");
const cors = require("cors"); // Uncommented to enable CORS
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const projectRoutes = require("./routes/ProjectRoute");
const DetailProjectUtamaRoutes = require('./routes/DetailProjectUtamaRoute');
const DetailProjectPendukungRoutes = require('./routes/DetailProjectPendukungRoute');
const AuthRoutes = require("./routes/AuthRoute");
const UserRoutes = require("./routes/UserRoute");
const LogAktivitasRoutes = require("./routes/LogAktivitasRoute")
const swaggerDocs = require("./swagger");

dotenv.config();

const app = express();

// Configure CORS
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));

app.use(express.json());

// Middleware for logging requests (optional)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Middleware untuk serve static files jika ingin mengakses file upload
app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/projects", projectRoutes);
app.use('/api/detail-project-utama', DetailProjectUtamaRoutes);
app.use('/api/detail-project-pendukung', DetailProjectPendukungRoutes);
app.use('/api/log-aktivitas', LogAktivitasRoutes);

// Swagger Documentation
swaggerDocs(app);

const PORT = process.env.PORT || 5000;

// Function to synchronize the database and seed initial data
const initializeDatabase = async () => {
    try {
        await sequelize.sync({ force: false }); // Be careful, this will drop existing tables
        console.log("Database synced");
        
        // Uncomment to run the role seeder
        // await seedRoles.up(queryInterface); // Call the `up` method from seedRoles
        // console.log("Role seeder completed");
    } catch (error) {
        console.error("Error syncing database:", error);
        throw error; // Rethrow error to be caught later
    }
};

// Start the server
initializeDatabase()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT} http://localhost:5000/api-filemaster/docs`));
    })
    .catch((error) => {
        console.error("Error starting the server:", error);
        process.exit(1); // Exit the process with an error code
    });
