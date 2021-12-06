const fs = require("fs");
const path = require("path");

exports.removeFile = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  console.log(filePath);
  fs.unlink(filePath, (err) => {
    if (err) console.log(err);
  });
};
