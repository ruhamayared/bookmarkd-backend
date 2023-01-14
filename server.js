//Import dependencies
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";


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
////////////////////////////////

const BookmarkdSchema = new mongoose.Schema({
  title: String,
  url: String
})

const Bookmarks = mongoose.model("Bookmarks", BookmarkdSchema)

//Routes and routers
app.get("/", (req, res) => {
  res.send("The route works!")
})


// Create Route
app.post('/bookmark', async (req, res) => {
  try{
    res.json(await Bookmark.create(req.body))
  }catch(error){
    res.status(400).json(error)
  }
});

app.put ('/bookmark/:id', async (req, res) => {
  try{
    res.json(await Bookmark.findByIdAndUpdate(req.params.id, req.body, {new: true}))
  }catch(error){
    res.status(400).json(error)
  }
})








//Listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
