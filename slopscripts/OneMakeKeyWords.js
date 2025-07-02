import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function writeCsvFile(data, filename) {
  const csvWriter = createObjectCsvWriter({
    path: filename,
    header: [
      { id: 'title', title: 'title' },
      { id: 'subtitle', title: 'subtitle' },
      { id: 'snippet', title: 'snippet' },
      { id: 'keywords', title: 'keywords' },
      { id: 'category', title: 'category' }
    ]
  });
  
  await csvWriter.writeRecords(data);
  console.log(`\n💾 Saved progress to ${filename} (${data.length} rows)`);
}

async function processRow(title, subtitle, snippet, retryCount = 0) {
  try {
    const prompt = `Based on this title: "${title}", subtitle: "${subtitle}", and snippet: "${snippet}", generate a 3 phrases of 3 or 4+ word keyword groupings with high intent relevant keywords/phrases that would be useful for SEO and content discovery. All of the content is related to Porn use - so keep that in mind when creating the keywords.Return only the keywords separated by commas, no additional text or formatting. Focus on terms that people would search for when looking for this type of content.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    console.log(`\nTitle: ${title}`);
    console.log(`Subtitle: ${subtitle}`);
    console.log(`Generated keywords: ${response.text}`);
    console.log('─'.repeat(80));
    
    return response.text.trim(); // Return the keywords
  } catch (error) {
    if (error.error?.code === 429 && retryCount < 3) {
      // Rate limit hit - implement exponential backoff
      const waitTime = Math.pow(2, retryCount) * 30; // 30s, 60s, 120s
      console.log(`Rate limit hit. Waiting ${waitTime} seconds before retry ${retryCount + 1}/3...`);
      await sleep(waitTime * 1000);
      return processRow(title, subtitle, snippet, retryCount + 1);
    } else {
      console.error(`Error processing row: ${error.message}`);
      if (error.error?.code === 429) {
        console.error('Rate limit exceeded. Consider upgrading your API plan or waiting longer.');
      }
      return null; // Failed
    }
  }
}

async function main() {
  const results = [];
  
  // Read the CSV file
  fs.createReadStream('data/blog-seeding.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      console.log('Processing blog articles for keyword generation...\n');
      
      let successCount = 0;
      let failureCount = 0;
      const processedResults = [];
      
      // Process each row
      for (let i = 0; i < results.length; i++) {
        const row = results[i];
        const { title, subtitle, snippet } = row;
        
        console.log(`Processing ${i + 1}/${results.length}...`);
        const generatedKeywords = await processRow(title, subtitle, snippet);
        
        if (generatedKeywords) {
          // Create new row with generated keywords
          const processedRow = {
            title: title,
            subtitle: subtitle,
            snippet: snippet,
            keywords: generatedKeywords,
            category: row.category || ''
          };
          processedResults.push(processedRow);
          successCount++;
          
          // Print the processed row data
          console.log('\n📝 Processed Row Data:');
          console.log(`Title: ${processedRow.title}`);
          console.log(`Subtitle: ${processedRow.subtitle}`);
          console.log(`Snippet: ${processedRow.snippet}`);
          console.log(`Keywords: ${processedRow.keywords}`);
          console.log(`Category: ${processedRow.category}`);
          console.log('─'.repeat(80));
        } else {
          // Keep the original keywords if processing failed
          const processedRow = {
            title: title,
            subtitle: subtitle,
            snippet: snippet,
            keywords: row.keywords || '',
            category: row.category || ''
          };
          processedResults.push(processedRow);
          failureCount++;
          
          // Print the processed row data
          console.log('\n📝 Processed Row Data (Failed):');
          console.log(`Title: ${processedRow.title}`);
          console.log(`Subtitle: ${processedRow.subtitle}`);
          console.log(`Snippet: ${processedRow.snippet}`);
          console.log(`Keywords: ${processedRow.keywords}`);
          console.log(`Category: ${processedRow.category}`);
          console.log('─'.repeat(80));
        }
        
        // Save progress after every 10 API calls
        if ((i + 1) % 10 === 0) {
          console.log(`\n📊 Progress: ${i + 1}/${results.length} completed`);
          console.log(`✅ Success: ${successCount}, ❌ Failures: ${failureCount}`);
          
          // Create a temporary file with current progress
          const tempFilename = `data/oneSnapShot-progress-${i + 1}.csv`;
          await writeCsvFile(processedResults, tempFilename);
        }
        
        // Add a delay between requests to avoid rate limiting
        if (i < results.length - 1) {
          console.log('Waiting 3 seconds before next request...');
          await sleep(3000);
        }
      }
      
      // Final save to the oneSnapShot.csv file
      await writeCsvFile(processedResults, 'data/oneAddingKeywords.csv');
      
      console.log(`\n🎉 Finished processing all articles for keywords!`);
      console.log(`✅ Success: ${successCount}, ❌ Failures: ${failureCount}`);
      console.log(`📁 Final CSV file saved as data/oneSnapShot.csv`);
      
      // Clean up temporary progress files
      console.log(`🧹 Cleaning up temporary progress files...`);
      for (let i = 10; i <= results.length; i += 10) {
        const tempFile = `data/oneSnapShot-progress-${i}.csv`;
        if (fs.existsSync(tempFile)) {
          fs.unlinkSync(tempFile);
        }
      }
      console.log(`✨ Cleanup complete!`);
    });
}

main(); 