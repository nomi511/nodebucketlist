require("dotenv").config()
require("express-async-errors")

const express = require("express")
const db = require("./db/connect")
const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")
const limiter = require("express-rate-limit")


const app = express();


// security
app.set('trust proxy', 1)
app.use(limiter({
    windowMs: 5 * 60 * 1000, // 10 minutes
    max: 100 // limit each ip to 100 requests per 5 min
}))

app.use(express.json())

app.use(helmet())
app.use(cors({origin:"*"}))
app.use(xss())



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