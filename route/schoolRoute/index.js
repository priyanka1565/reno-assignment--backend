const express = require("express");
const router = express.Router();
const schoolController = require("../../controller/schoolController");
const {upload} = require("../../middleware/fileupload/fileUpload");

router.post("/add/schoool",schoolController.addSchoolData);
router.post("/upload/school_image",upload.single("school_image"),schoolController.uploadSchoolImage);
router.post("/get/school_list",schoolController.getSchoolList);

module.exports = router;