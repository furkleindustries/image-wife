const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const imagesDir = path.join(__dirname, 'images');

const getBase64FromImage = async (filepath) => {
  const data = await fs.readFile(filepath);
  return data.toString('base64');
};

glob(`${imagesDir}/*.png`, async (err, matches) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  for (const match of matches) {
    const {
      base,
    } = path.parse(match);

    const output = await getBase64FromImage(match);
    const outputPath = path.join(
      distDir,
      'images',
      `${base.slice(0, -4)}_b64.txt`,
    );

    fs.writeFile(outputPath, output);
  }
})
