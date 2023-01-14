//Import dependencies
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

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
const PORT = process.env.PORT ?? 4000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
