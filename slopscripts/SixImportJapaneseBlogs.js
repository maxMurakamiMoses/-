import { PrismaClient } from '../generated/prisma/index.js';
import fs from 'fs';
import csv from 'csv-parser';

const prisma = new PrismaClient();

async function importJapaneseBlogs() {
  try {
    console.log('Starting import of Japanese blog posts...');
    
    const results = [];
    
    // Read the CSV file
    fs.createReadStream('./data/fiveTranslateBlogContent.csv')
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', async () => {
        console.log(`Found ${results.length} rows in CSV`);
        
        let importedCount = 0;
        let skippedCount = 0;
        
        for (const row of results) {
          try {
            // Extract Japanese data
            const title = row.title_japanese?.trim();
            const subtitle = row.subtitle_japanese?.trim() || null;
            const keywords = row.keywords_japanese?.trim() || null;
            const metadata = row.metadata_japanese?.trim() || null;
            const category = row.category_japanese?.trim() || null;
            const content = row.blogContent_japanese?.trim() || null;
            
            // Skip if no title (required field)
            if (!title) {
              console.log(`Skipping row: No title found`);
              skippedCount++;
              continue;
            }
            
            // Convert keywords string to array if it exists
            let keywordsArray = null;
            if (keywords) {
              keywordsArray = keywords.split(',').map(k => k.trim()).filter(k => k.length > 0);
            }
            
            // Check if blog post already exists
            const existingPost = await prisma.blogPost.findUnique({
              where: { title }
            });
            
            if (existingPost) {
              console.log(`Blog post with title "${title}" already exists, skipping...`);
              skippedCount++;
              continue;
            }
            
            // Create new blog post
            const newPost = await prisma.blogPost.create({
              data: {
                title,
                subtitle,
                keywords: keywordsArray,
                metadata,
                category,
                content,
                author: null, // As requested
                image: null,  // As requested
                isPublished: true
              }
            });
            
            console.log(`✅ Imported: "${title}"`);
            importedCount++;
            
          } catch (error) {
            console.error(`❌ Error processing row:`, error.message);
            skippedCount++;
          }
        }
        
        console.log('\n=== Import Summary ===');
        console.log(`✅ Successfully imported: ${importedCount} blog posts`);
        console.log(`⏭️  Skipped: ${skippedCount} rows`);
        console.log(`📊 Total processed: ${results.length} rows`);
        
      });
      
  } catch (error) {
    console.error('❌ Import failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the import
importJapaneseBlogs(); 