//Import dependencies
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT

//Create express app
const app = express()

//Register middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
mongoose.connect(DATABASE_URL)

mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error))

///////////////////////////////
// MODELS
///////////////////////////////

const BookmarkdSchema = new mongoose.Schema({
  title: String,
  url: String,
})

const Bookmarks = mongoose.model("Bookmarks", BookmarkdSchema)

// Index Route
app.get("/bookmarks", async (req, res) => {
  try {
    res.json(await Bookmarks.find({}))
  } catch (error) {
    res.status(400).json(error)
  }
})

// Delete Route
app.delete("/bookmarks/:id", async (req, res) => {
  try {
    res.json(await Bookmarks.findByIdAndRemove(req.params.id))
  } catch (error) {
    res.status(400).json(error)
  }
})

// Update Route
app.put("/bookmarks/:id", async (req, res) => {
  res.json(await Bookmarks.findByIdAndUpdate(req.params.id, req.body, { new: true }))
})

// Create Route
app.post("/bookmarks", async (req, res) => {
  try {
    res.json(await Bookmarks.create(req.body))
  } catch (error) {
    res.status(400).json(error)
  }
})

//Show route -- takes to update page
app.get("/bookmarks/:id", async (req, res) => {
  try {
    res.json(await Bookmarks.findById(req.params.id))
  } catch (error) {
    res.status(400).json(error)
  }
})

//Listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

// YODA WAS HERE
