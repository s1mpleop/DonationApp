const express = require("express");
const router = express.Router();
const {getPrivatedata,updatedatabase,previousdonation} = require('../controllers/private');
const {protect,x} = require('../middleware/auth');
router.route("/").get(protect,getPrivatedata);
router.route("/donate/:token").post(updatedatabase);
router.route('/previousdonation/:token').get(previousdonation);
module.exports = router;