const {subscribe, unSubscribe} = require("../controllers/newsletterController");
const router = require("express").Router();

router.post("/subscribe", subscribe);
router.post("/unsubscribe", unSubscribe);

module.exports = router;
