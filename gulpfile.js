const { dest, series, src } = require('gulp');
const through2 = require('through2');
const imagemin = require('gulp-imagemin');
const sharp = require('sharp');


function clean(cb) {
  console.log("clean", cb)
  cb();
}

function resize() {
  return through2.obj(function(file, _, cb) {
    const outputFile = `${file.dirname}/${file.stem}-test${file.extname}`
    console.log(outputFile)
    // to do: use sharp to resize images
    sharp(file.contents)
    .resize(320, 240)
    .toFile(outputFile, (err, info) => { 
      console.log(info)
      cb(null, file);
     });
    
  })
}

function printInfo() {
  return through2.obj(function(file, _, cb) {
    console.log(file.path)
     cb(null, file);
  })
}


function processImages() {
  console.log("processImages")
  return src('assets/img/posts/*.{png,jpg}')
    .pipe(resize())
// .pipe(imagemin())
    .pipe(printInfo())
    .pipe(dest('assets/img/tests/'));
}

exports.processImages = processImages;
exports.default = series(clean, processImages);



