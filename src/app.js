const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const userRoute = require('./routes/userRoute')
const yearRoute = require('./routes/yearRoute')
const classeRoute = require('./routes/classeRoute')
const matiereRoute = require('./routes/matiereRoute')
const studentRoute = require('./routes/studentRoute')
const authRoute = require('./routes/authRoute')
const projectRoute = require('./routes/projectRoute')
const projectAnonymeRoute = require('./routes/projectAnonymeRoute')
const newsletterRoute = require('./routes/newsLettersRoute')
const mailsController = require('./controllers/mailsController');

const cors = require('cors');
const app = express();

const {verifyUser} = require("./middleware/verifyToken");

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static('./public'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(cors());

app.post('/api/mail', mailsController.sendMail)
app.use("/api/newsletter", newsletterRoute);
app.use("/api/projects", projectAnonymeRoute);
app.use("/api/auth", authRoute);
app.use('/api', verifyUser);
app.use("/api/users", userRoute);
app.use("/api/years", yearRoute);
app.use("/api/classes", classeRoute);
app.use("/api/matieres", matiereRoute);
app.use("/api/students", studentRoute);
app.use("/api/admin/projects", projectRoute);

app.get('/', (req, res) => {
    res.send('API IS NOW WORKING, append "/docs" to the current url to access API documentation');
});


app.use((req, res, next) => {
    const error = new Error();
    error.message = "Not Found";
    error.status = 404;
    next(error);
});

module.exports = app;



