const express = require('express');
const router = express.Router();
const { controllerAddCategory, controllerGetAllCategory } = require("../controllers/Category");
const verfiyJwtToken = require("../utils/VerfiyToken");
const { isAdmin } = require("../middleware/authUser");

router
    .post("/addCategory", verfiyJwtToken, controllerAddCategory)
    .get("/", verfiyJwtToken, controllerGetAllCategory)

module.exports = router;