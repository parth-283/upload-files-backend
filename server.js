const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/upload", (req, res) => {
  const newpath = __dirname + "/files/";
  const file = req.files;
  const filename = file.files.name;
  console.log("filename###############################", filename);

  file.files.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "File upload failed", code: 200, error: err });
    }
    return res.status(200).send({ message: "File Uploaded", code: 200, FileURL:(PORT === 4000 ? `http://localhost:${PORT}/${filename}` :`${PORT}/${filename}`) });
  });
});


app.listen(PORT, () => {
  console.log(`Server running successfully on ${PORT}`);
});
