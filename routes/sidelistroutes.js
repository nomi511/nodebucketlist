const express = require("express")
const router = express.Router()

const {
    sidelist,
    singlesidelist,
    createsidelist,
    updatesidelist,
    deletesidelist
} = require("../controllers/side")


router.route("/").get(sidelist).post(createsidelist)

router.route("/:id").get(singlesidelist).patch(updatesidelist).delete(deletesidelist)


module.exports = router