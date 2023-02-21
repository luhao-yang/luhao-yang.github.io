const { dest, series, src } = require("gulp");
const through2 = require("through2");
const imagemin = require("gulp-imagemin");
const sharp = require("sharp");
const Vinyl = require("vinyl");
const fs = require("fs");

function init(cb) {
  console.log("init", cb);
  cb();
}

const SIZES = [
  {
    width: 230,
    rename: { suffix: "_placehold" },
  },
  {
    // thubmnail
    width: 535,
    rename: { suffix: "_thumb" },
  },
  {
    // thumbnail @2x
    width: 535 * 2,
    rename: { suffix: "_thumb@2x" },
  },
];

function isOriginalImage(file) {
  return !SIZES.find((item) => file.stem.endsWith(item.rename.suffix));
}

function filter(predicates) {
  return through2.obj(function (file, _, cb) {
    if (predicates(file)) {
      cb(null, file);
    } else {
      cb(null);
    }
  });
}

// check it out here https://github.com/mahnunchik/gulp-responsive/blob/master/lib/sharp.js,  gulp-reponsive
// but because gulp-responsive is not working probably due to out of date, I have to implement a simpler version
function resize() {
  return through2.obj(function (file, _, cb) {
    const that = this;
    const filenames = [];
    const allPromises = [];

    SIZES.forEach((item) => {
      const outputFile = `${file.dirname}/${file.stem}${item.rename.suffix}.jpg`; // not using ${file.extname} because all convert to jpg
      filenames.push(outputFile);

      const image = sharp(file.contents);
      image.resize(item.width).jpeg({
        quality: 100,
      });

      const clone = image.clone();
      allPromises.push(clone.toBuffer());
    });

    Promise.all(allPromises)
      .then((values) => {
        values.forEach((buffer, index) => {
          const vinylFile = new Vinyl({
            cwd: file.cwd,
            base: file.base,
            path: filenames[index],
            contents: buffer,
          });
          that.push(vinylFile);
        });

        cb(null);
      })
      .catch(console.error);
  });
}

function rename() {
  return through2.obj(function (file, _, cb) {
    const that = this;
    const outputFile = `${file.dirname}/${file.stem}.jpg`; 
    sharp(file.contents).clone().toBuffer().then(buffer => {
      const vinylFile = new Vinyl({
        cwd: file.cwd,
        base: file.base,
        path: outputFile,
        contents: buffer,
      });
      that.push(vinylFile);
      cb(null);
      
    });
  })
}

function printInfo() {
  return through2.obj(function (file, _, cb) {
    console.log("printInfo for testing", file.path);
    cb(null, file);
  });
}

function processImages() {
  console.log("processImages");
  return src("assets/img/posts_cover/original/*.{png,jpg}")
    .pipe(filter(isOriginalImage))
    .pipe(resize())
    .pipe(imagemin())
    .pipe(printInfo())
    .pipe(dest("assets/img/posts_cover/generated"));
}

function copyImages() {
  console.log("copyImages");
  return src("assets/img/posts_cover/original/*.{png,jpg}")
    .pipe(rename())
    .pipe(imagemin())
    .pipe(dest("assets/img/posts_cover/generated"));
}

exports.processImages = processImages;
exports.default = series(init, processImages, copyImages);
