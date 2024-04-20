const router = require("express").Router();
const yearController = require("../controllers/yearController");

router.get("/", yearController.getYears);
router.get("/:id", yearController.getYear);
router.post("/", yearController.addYear);
router.put("/:id", yearController.updateYear);
router.delete("/:id", yearController.deleteYear);

// Ajoutez les nouvelles routes ici
router.delete("/all", yearController.deleteAllYears);
router.put("/publish", yearController.publishAllYears);
router.put("/unpublish", yearController.unpublishAllYears);
router.put("/:id/publish", yearController.publishYear);
router.put("/:id/unpublish", yearController.unpublishYear);

module.exports = router;
