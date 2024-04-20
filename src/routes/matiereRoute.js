const router = require("express").Router();
const matiereController = require("../controllers/matiereController");

router.get("/", matiereController.getMatieres);
router.get("/:id", matiereController.getMatiere);
router.post("/", matiereController.addMatiere);
router.put("/:id", matiereController.updateMatiere);
router.delete("/:id", matiereController.deleteMatiere);

// Ajoutez les nouvelles routes ici
router.delete("/all", matiereController.deleteAllMatieres);
router.put("/publish", matiereController.publishAllMatieres);
router.put("/unpublish", matiereController.unpublishAllMatieres);
router.put("/:id/publish", matiereController.publishMatiere);
router.put("/:id/unpublish", matiereController.unpublishMatiere);

module.exports = router;
