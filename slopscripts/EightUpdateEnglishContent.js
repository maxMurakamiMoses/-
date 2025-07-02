import { PrismaClient } from '../generated/prisma/index.js';
import fs from 'fs';
import csv from 'csv-parser';

const prisma = new PrismaClient();

async function updateEnglishTitles() {
  try {
    console.log('Starting update of title_english and subtitle_english for existing blog posts...');
    const results = [];

    // Read the CSV file
    fs.createReadStream('./data/fiveTranslateBlogContent.csv')
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', async () => {
        console.log(`Found ${results.length} rows in CSV`);
        let updatedCount = 0;
        let skippedCount = 0;

        for (const row of results) {
          const title_japanese = row.title_japanese?.trim();
          const title_english = row.title?.trim() || null;
          const subtitle_english = row.subtitle?.trim() || null;

          if (!title_japanese) {
            console.log('Skipping row: No title_japanese found');
            skippedCount++;
            continue;
          }

          // Find the existing blog post by Japanese title
          const existingPost = await prisma.blogPost.findUnique({
            where: { title: title_japanese }
          });

          if (!existingPost) {
            console.log(`No blog post found with title (Japanese): "${title_japanese}". Skipping.`);
            skippedCount++;
            continue;
          }

          // Update the title_english and subtitle_english fields
          await prisma.blogPost.update({
            where: { title: title_japanese },
            data: { title_english, subtitle_english }
          });

          console.log(`✅ Updated title_english and subtitle_english for: "${title_japanese}"`);
          updatedCount++;
        }

        console.log('\n=== Update Summary ===');
        console.log(`✅ Successfully updated: ${updatedCount} blog posts`);
        console.log(`⏭️  Skipped: ${skippedCount} rows`);
        console.log(`📊 Total processed: ${results.length} rows`);
        await prisma.$disconnect();
      });
  } catch (error) {
    console.error('❌ Update failed:', error);
    await prisma.$disconnect();
  }
}

// Run the update
updateEnglishTitles(); 