//Import dependencies
import express from "express"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"

//Get env variables
dotenv.config()

//Create express app
const app = express()

//Register middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

//Routes and routers
app.get("/", (req, res) => {
  res.send("The route works!")
})

//Listener
const PORT = process.env.PORT ?? 4000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
