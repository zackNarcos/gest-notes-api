const router = require("express").Router();
const classeController = require("../controllers/classeController");

router.get("/", classeController.getClasses);
router.get("/:id", classeController.getClasse);
router.post("/", classeController.addClasse);
router.put("/:id", classeController.updateClasse);
router.delete("/:id", classeController.deleteClasse);

// Ajoutez les nouvelles routes ici
router.delete("/all", classeController.deleteAllClasses);
router.put("/publish", classeController.publishAllClasses);
router.put("/unpublish", classeController.unpublishAllClasses);
router.put("/:id/publish", classeController.publishClasse);
router.put("/:id/unpublish", classeController.unpublishClasse);

module.exports = router;
