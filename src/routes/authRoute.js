const {logIn} = require("../controllers/authController");
const router = require("express").Router();

/**
 * @typedef Auth
 */

/**
 * POST /api/auth/login
 * @summary This is the summary of the endpoint
 * @tags auth
 * @param {string} email.query.required - email
 * @param {string} password.query.required - password
 *
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 * @return {object} 401 - invalid login credential
 * @return {object} 404 - user not found
 */
router.post("/login", logIn);


module.exports = router;
