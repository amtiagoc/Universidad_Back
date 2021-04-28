const express = require("express")
const router = express.Router();
const _userController = require('../controllers/people/people.controller');

router.get("/people/excel", _userController.createReport)
.post('/people', _userController.createPeople)

module.exports = router;