const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateIcons() {
  const inputPath = path.join(__dirname, '../client/public/promptvault_logo.jpg');
  const outputDir = path.join(__dirname, '../client/public');

  // Generate favicon.ico (multiple sizes in one file)
  await sharp(inputPath)
    .resize(64, 64)
    .toFile(path.join(outputDir, 'favicon.ico'));

  // Generate logo192.png
  await sharp(inputPath)
    .resize(192, 192)
    .toFile(path.join(outputDir, 'logo192.png'));

  // Generate logo512.png
  await sharp(inputPath)
    .resize(512, 512)
    .toFile(path.join(outputDir, 'logo512.png'));

  console.log('Icons generated successfully!');
}

generateIcons().catch(console.error);
