import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});
const upload = multer({ storage });
export default function (req, res, next) {
  try{upload.single("images")(req, res, (err) => {
    if (err) {
      return next(err);
    }
    console.log("multter",req)
    req.imagePath = req.file.path;
    next();
  });}catch (err) {next(err);}
}
