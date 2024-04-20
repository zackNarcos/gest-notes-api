const router = require("express").Router();
const studentController = require("../controllers/studentController");

router.get("/", studentController.getStudents);
router.get("/:id", studentController.getStudent);
router.post("/", studentController.addStudent);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

// Ajoutez les nouvelles routes ici
router.delete("/all", studentController.deleteAllStudents);
router.put("/publish", studentController.publishAllStudents);
router.put("/unpublish", studentController.unpublishAllStudents);
router.put("/:id/publish", studentController.publishStudent);
router.put("/:id/unpublish", studentController.unpublishStudent);

module.exports = router;
