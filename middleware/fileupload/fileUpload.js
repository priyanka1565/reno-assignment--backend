const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, 'uploads/tmp');
        let dest = "uploads/schoolImages";
        // if(req.url=="/course_doc/upload"){
        //      dest = 'uploads/docs'
        // }
        fs.access(dest, function (error) {
            if (error) {
                // console.log("Directory does not exist.");
                return fs.mkdir(dest, (error) => cb(error, dest));
            } else {
                // console.log("Directory exists.");
                return cb(null, dest);
            }
        });
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileSize = parseInt(req.headers["content-length"])
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            return cb(null, true);
        } else {
            return fileSize > 5242880 ? cb(new Error('File size more than 5 MB')) : cb(new Error('Only .png, .jpg and .jpeg allowed!'));
        }
    }
});

module.exports ={
    upload
}