const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyUser, verifyAdmin } = require("../middleware/verifyToken");

router.get("/", userController.getUsers)

router.patch('/:id', userController.updateUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.get("/me", userController.data);

module.exports = router;
