const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const imagesDistDir = path.join(distDir, 'images');
const outputPath = path.join(__dirname, 'src', 'imageFilepaths.ts');
glob(`${imagesDistDir}/*.png`, (err, matches) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const relativePaths = matches.map((match) => path.relative(distDir, match));
  const stringified = JSON.stringify(relativePaths, null, 2);
  const output = `export default ${stringified};`
  fs.writeFile(outputPath, output, 'utf8');
});
