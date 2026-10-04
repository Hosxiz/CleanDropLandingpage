/**
 * AQUAVITA Build Script
 * Zero-dependency HTML Compiler & Watcher
 * 
 * Usage:
 *   node build.js          # Single build
 *   node build.js --watch  # Build and watch for changes in src/
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src');
const TEMPLATE_FILE = path.join(SRC_DIR, 'index.html');
const OUTPUT_FILE = path.resolve(__dirname, 'index.html');

const INCLUDE_REGEX = /<!--\s*@include\s*["']([^"']+)["']\s*-->/g;

function compileTemplate(filePath, seen = new Set()) {
  if (seen.has(filePath)) {
    throw new Error(`Circular include detected: ${filePath}`);
  }
  seen.add(filePath);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  const baseDir = path.dirname(filePath);

  content = content.replace(INCLUDE_REGEX, (match, relPath) => {
    const targetPath = path.resolve(baseDir, relPath);
    if (!fs.existsSync(targetPath)) {
      console.warn(`[WARN] Included file not found: ${targetPath}`);
      return `<!-- Missing include: ${relPath} -->`;
    }
    return compileTemplate(targetPath, new Set(seen));
  });

  return content;
}

function build() {
  const startTime = Date.now();
  try {
    const result = compileTemplate(TEMPLATE_FILE);
    fs.writeFileSync(OUTPUT_FILE, result, 'utf-8');
    const elapsed = Date.now() - startTime;
    const stats = fs.statSync(OUTPUT_FILE);
    const sizeKb = (stats.size / 1024).toFixed(2);
    console.log(`[SUCCESS] Compiled -> index.html (${sizeKb} KB) in ${elapsed}ms at ${new Date().toLocaleTimeString()}`);
    return true;
  } catch (err) {
    console.error(`[ERROR] Build failed:`, err.message);
    return false;
  }
}

// Initial Build
build();

// Watch mode if --watch is passed
if (process.argv.includes('--watch')) {
  console.log(`[WATCH] Watching for changes in ${SRC_DIR}...`);
  let debounceTimeout = null;

  try {
    fs.watch(SRC_DIR, { recursive: true }, (eventType, filename) => {
      if (!filename || !filename.endsWith('.html')) return;
      if (debounceTimeout) clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        console.log(`[WATCH] Change detected in ${filename}, rebuilding...`);
        build();
      }, 100);
    });
  } catch (err) {
    console.error('[ERROR] Watch failed:', err.message);
  }
}
