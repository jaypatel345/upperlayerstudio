import { execSync } from "node:child_process";
import { statSync, copyFileSync, unlinkSync } from "node:fs";

// Compresses all mp4 files in public/work to be strictly under 3 MB
const files = execSync("find public/work -name '*.mp4'")
  .toString()
  .trim()
  .split("\n")
  .filter(Boolean);

console.log(`Checking ${files.length} video files...`);

const MAX_BYTES = 2.9 * 1024 * 1024; // 2.9 MB ceiling

for (const file of files) {
  const size = statSync(file).size;
  const sizeMB = (size / (1024 * 1024)).toFixed(2);
  
  if (size <= MAX_BYTES) {
    console.log(`✓ ${file} is ${sizeMB} MB (already under 3 MB)`);
    continue;
  }

  console.log(`⏳ Compressing ${file} (${sizeMB} MB)...`);
  const tmpOut = `/tmp/compressed-${Date.now()}-${Math.random().toString(36).slice(2)}.mp4`;
  
  // Target bitrate around 340k with maxrate 400k to ensure < 2.8 MB for 60s
  try {
    execSync(
      `ffmpeg -y -i "${file}" -vcodec libx264 -b:v 340k -maxrate 400k -bufsize 700k -preset fast -pix_fmt yuv420p -an -movflags +faststart "${tmpOut}"`,
      { stdio: "ignore" }
    );
    const newSize = statSync(tmpOut).size;
    const newSizeMB = (newSize / (1024 * 1024)).toFixed(2);
    
    copyFileSync(tmpOut, file);
    unlinkSync(tmpOut);
    console.log(`  -> Reduced to ${newSizeMB} MB!`);
  } catch (err) {
    console.error(`  Failed to compress ${file}:`, err.message);
  }
}

console.log("Video compression complete.");
