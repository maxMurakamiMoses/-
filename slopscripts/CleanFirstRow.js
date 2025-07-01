import fs from 'fs';
import csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';

async function writeCsvFile(data, filename) {
  const csvWriter = createObjectCsvWriter({
    path: filename,
    header: [
      { id: 'rowNumber', title: 'rowNumber' },
      { id: 'title', title: 'title' },
      { id: 'subtitle', title: 'subtitle' },
      { id: 'snippet', title: 'snippet' },
      { id: 'keywords', title: 'keywords' },
      { id: 'metadata', title: 'metadata' },
      { id: 'category', title: 'category' },
      { id: 'blogContent', title: 'blogContent' }
    ]
  });
  
  await csvWriter.writeRecords(data);
  console.log(`\n💾 Saved to ${filename} (${data.length} rows)`);
}

async function main() {
  const results = [];
  
  // Read the CSV file
  fs.createReadStream('data/threeAddBlog.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      console.log('Processing CSV file to clean first row...\n');
      
      const cleanedResults = [];
      
      // Process each row
      for (let i = 0; i < results.length; i++) {
        const row = results[i];
        const { title, subtitle, snippet, keywords, metadata, category, blogContent } = row;
        
        if (i === 0) {
          // First row - remove blog content
          const cleanedRow = {
            rowNumber: i + 1,
            title: title,
            subtitle: subtitle,
            snippet: snippet,
            keywords: keywords,
            metadata: metadata,
            category: category || '',
            blogContent: '' // Empty blog content for first row
          };
          cleanedResults.push(cleanedRow);
          console.log(`\n🧹 Cleaned first row: "${title}"`);
          console.log(`Blog content removed (was ${blogContent.length} characters)`);
        } else {
          // All other rows - keep as is
          const cleanedRow = {
            rowNumber: i + 1,
            title: title,
            subtitle: subtitle,
            snippet: snippet,
            keywords: keywords,
            metadata: metadata,
            category: category || '',
            blogContent: blogContent
          };
          cleanedResults.push(cleanedRow);
        }
      }
      
      // Save to the cleaned.csv file
      await writeCsvFile(cleanedResults, 'data/cleaned.csv');
      
      console.log(`\n🎉 Finished cleaning CSV file!`);
      console.log(`📁 Saved as data/cleaned.csv`);
      console.log(`📊 Total rows: ${cleanedResults.length}`);
      console.log(`🧹 First row blog content removed`);
    });
}

main(); 