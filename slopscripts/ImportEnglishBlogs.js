import { PrismaClient } from '../generated/prisma/index.js';
import fs from 'fs';
import csv from 'csv-parser';

const prisma = new PrismaClient();

async function importEnglishBlogs() {
  try {
    console.log('Starting import of English blog posts...');
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
            const title = row.title?.trim();
            const subtitle = row.subtitle?.trim() || null;
            const metadata = row.metadata?.trim() || null;
            const category = row.category?.trim() || null;
            const content = row.blogContent?.trim() || null;
            if (!title) {
              console.log(`Skipping row: No title found`);
              skippedCount++;
              continue;
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
            await prisma.blogPost.create({
              data: {
                title,
                subtitle,
                metadata,
                category,
                content,
                // All other fields left as default/null
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
importEnglishBlogs(); 