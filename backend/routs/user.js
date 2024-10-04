const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller');
router.get('/ViewDetail/:id', usercontroller.viewDetail);
router.post('/editdetail/:id', usercontroller.editDetail);
router.delete('/deleteData/:id', usercontroller.deleteUser);
module.exports = router;