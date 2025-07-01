#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log('✅ Created data directory');
}

// List all CSV files in the data directory
function listDataFiles() {
  const files = fs.readdirSync(DATA_DIR);
  const csvFiles = files.filter(file => file.endsWith('.csv'));
  
  console.log('\n📊 Data files in repository:');
  csvFiles.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    const stats = fs.statSync(filePath);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`  - ${file} (${sizeInMB} MB)`);
  });
  
  if (csvFiles.length === 0) {
    console.log('  No CSV files found');
  }
}

// Check if files are being tracked by Git
function checkGitStatus() {
  const { execSync } = require('child_process');
  try {
    const status = execSync('git status --porcelain data/', { encoding: 'utf8' });
    console.log('\n🔍 Git status for data files:');
    if (status.trim()) {
      console.log(status);
    } else {
      console.log('  All data files are tracked by Git');
    }
  } catch (error) {
    console.log('  Could not check Git status');
  }
}

// Main execution
console.log('🚀 Data Management Utility');
console.log('========================');

listDataFiles();
checkGitStatus();

console.log('\n💡 Tips:');
console.log('  - Your CSV files are saved to GitHub but excluded from deployment');
console.log('  - Use .vercelignore to exclude files from Vercel deployment');
console.log('  - Files in /data/ directory are tracked by Git but not deployed'); 