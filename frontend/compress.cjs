const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { exec } = require('child_process');
const ffmpegStatic = require('ffmpeg-static');

const publicDir = path.join(__dirname, 'public');

async function processFiles() {
  const files = fs.readdirSync(publicDir);
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const fullPath = path.join(publicDir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isFile()) { // Process all files
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        console.log(`Compressing image: ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
        const tempPath = path.join(publicDir, `temp_${file}`);
        
        try {
          if (ext === '.png') {
            await sharp(fullPath)
              .resize({ width: 1920, withoutEnlargement: true })
              .png({ quality: 60, compressionLevel: 9, adaptiveFiltering: true, force: true })
              .toFile(tempPath);
          } else {
            await sharp(fullPath)
              .resize({ width: 1920, withoutEnlargement: true })
              .jpeg({ quality: 70, mozjpeg: true, force: true })
              .toFile(tempPath);
          }
          fs.renameSync(tempPath, fullPath);
          const newSize = fs.statSync(fullPath).size;
          console.log(`Done: ${file} -> ${(newSize / 1024).toFixed(2)} KB`);
        } catch (e) {
          console.error(`Error processing ${file}:`, e);
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
      } else if (ext === '.mp4') {
        console.log(`Compressing video: ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
        const tempPath = path.join(publicDir, `temp_${file}`);
        
        await new Promise((resolve) => {
          // -crf 30 is good for high compression, -vf scale reduces resolution to 720p if larger
          const cmd = `"${ffmpegStatic}" -y -i "${fullPath}" -vcodec libx264 -crf 30 -preset veryfast -vf "scale='min(1280,iw)':min'(720,ih)':force_original_aspect_ratio=decrease" "${tempPath}"`;
          exec(cmd, (err, stdout, stderr) => {
            if (err) {
              console.error(`Error compressing ${file}`);
              if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
            } else {
              try {
                fs.renameSync(tempPath, fullPath);
                const newSize = fs.statSync(fullPath).size;
                console.log(`Done: ${file} -> ${(newSize / 1024 / 1024).toFixed(2)} MB`);
              } catch (e) {
                console.error(`Failed to move temp file for ${file}`);
              }
            }
            resolve();
          });
        });
      }
    }
  }
}

processFiles().then(() => console.log('Compression complete.')).catch(console.error);
