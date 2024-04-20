const router = require("express").Router();
const projectController = require("../controllers/projectController");

router.get("/", projectController.getProjects)

module.exports = router;
