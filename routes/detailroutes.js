const express = require("express")
const router = express.Router()

const {
    detail,
    singledetail,
    createdetail,
    updatedetail,
    deletedetail
} = require("../controllers/detail")


router.route("/").get(detail).post(createdetail)
router.route("/:id").get(singledetail).patch(updatedetail).delete(deletedetail)


module.exports = router