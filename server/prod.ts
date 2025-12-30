import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/database.js"
import propertyRoutes from "./routes/properties.js"
import leadRoutes from "./leads.js"
import siteVisitRoutes from "./siteVisits.js"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 10000

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.use("/api/properties", propertyRoutes)
app.use("/api/leads", leadRoutes)
app.use("/api/site-visits", siteVisitRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" })
})

app.use(express.static(path.join(__dirname, "../dist")))

// For all other routes, serve index.html (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"))
})

app.listen(PORT, () => {
  console.log(`[v0] Unified server running on port ${PORT}`)
})
