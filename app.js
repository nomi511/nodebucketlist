require("dotenv").config()
require("express-async-errors")

const express = require("express")
const db = require("./db/connect")

const app = express();

app.use(express.json())

// --- bodyparser
const bodyParser = require("body-parser")
app.unsubscribe(bodyParser.json())
// --- bodyparser

//errorhandler
const errors = require("./middlewares/errorhandler")
const notfound = require("./middlewares/pagenotfound")

// routes authentication
const authenticate = require("./middlewares/authentication")

//routers
const userRouter = require("./routes/authroutes")
const sideRouter = require("./routes/sidelistroutes")
const detailRouter = require("./routes/detailroutes")






// routes
app.use("/api/v1/user", userRouter)
app.use("/api/v1/detail", authenticate, detailRouter)
app.use("/api/v1/sidelist", authenticate, sideRouter)



app.use(notfound)
app.use(errors)


const port = process.env.PORT || 6000

const start = async () =>
{
    try {
        await db(process.env.MONGO_URI)
        app.listen(port, ()=>{console.log(`Server listening on port: ${port}`)})
    } catch (error) {
        console.log(error)
    }
}

start()