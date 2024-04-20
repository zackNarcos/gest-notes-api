const router = require("express").Router();
const multer = require("multer");
const projectController = require("../controllers/projectController");
const fs = require('fs');
const uploadDir = './public/uploads/';

if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public');
}
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${Date.now()}.${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png"  || file.mimetype === "image/jpg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
    fileFilter: fileFilter,
});

router.post("/", upload.single("image"), projectController.add);
router.get("/", projectController.getProjects)
router.get('/:id', projectController.getProject);
router.patch('/:id', upload.single("image"), projectController.updateProject);
router.put('/:id', upload.single("image"), projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
