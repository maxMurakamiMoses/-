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
      { id: 'metadata', title: 'metadata' },
      { id: 'category', title: 'category' }
    ]
  });
  
  await csvWriter.writeRecords(data);
  console.log(`\n💾 Saved progress to ${filename} (${data.length} rows)`);
}

async function processRow(title, keywords, retryCount = 0) {
  try {
    const prompt = `Based on this title: "${title}" and these keywords: "${keywords}", generate an SEO-optimized meta description that is approximately 155 characters long. The meta description should be compelling, include the target keywords naturally, and accurately describe what the article is about. Focus on creating a description that would encourage clicks from search results. Return only the meta description, no additional text or formatting.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    console.log(`\nTitle: ${title}`);
    console.log(`Keywords: ${keywords}`);
    console.log(`Generated meta description: ${response.text}`);
    console.log(`Character count: ${response.text.length}`);
    console.log('─'.repeat(80));
    
    return response.text.trim(); // Return the meta description
  } catch (error) {
    if (error.error?.code === 429 && retryCount < 3) {
      // Rate limit hit - implement exponential backoff
      const waitTime = Math.pow(2, retryCount) * 30; // 30s, 60s, 120s
      console.log(`Rate limit hit. Waiting ${waitTime} seconds before retry ${retryCount + 1}/3...`);
      await sleep(waitTime * 1000);
      return processRow(title, keywords, retryCount + 1);
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
  fs.createReadStream('data/oneAddingKeywords.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      console.log('Processing blog articles for meta description generation...\n');
      
      let successCount = 0;
      let failureCount = 0;
      const processedResults = [];
      
      // Process each row
      for (let i = 0; i < results.length; i++) {
        const row = results[i];
        const { title, subtitle, snippet, keywords, category } = row;
        
        console.log(`Processing ${i + 1}/${results.length}...`);
        const generatedMetadata = await processRow(title, keywords);
        
        if (generatedMetadata) {
          // Create new row with generated metadata
          const processedRow = {
            title: title,
            subtitle: subtitle,
            snippet: snippet,
            keywords: keywords,
            metadata: generatedMetadata,
            category: category || ''
          };
          processedResults.push(processedRow);
          successCount++;
          
          // Print the processed row data
          console.log('\n📝 Processed Row Data:');
          console.log(`Title: ${processedRow.title}`);
          console.log(`Subtitle: ${processedRow.subtitle}`);
          console.log(`Snippet: ${processedRow.snippet}`);
          console.log(`Keywords: ${processedRow.keywords}`);
          console.log(`Metadata: ${processedRow.metadata}`);
          console.log(`Category: ${processedRow.category}`);
          console.log('─'.repeat(80));
        } else {
          // Keep the original data if processing failed
          const processedRow = {
            title: title,
            subtitle: subtitle,
            snippet: snippet,
            keywords: keywords,
            metadata: '', // Empty metadata if processing failed
            category: category || ''
          };
          processedResults.push(processedRow);
          failureCount++;
          
          // Print the processed row data
          console.log('\n📝 Processed Row Data (Failed):');
          console.log(`Title: ${processedRow.title}`);
          console.log(`Subtitle: ${processedRow.subtitle}`);
          console.log(`Snippet: ${processedRow.snippet}`);
          console.log(`Keywords: ${processedRow.keywords}`);
          console.log(`Metadata: ${processedRow.metadata}`);
          console.log(`Category: ${processedRow.category}`);
          console.log('─'.repeat(80));
        }
        
        // Save progress after every 10 API calls
        if ((i + 1) % 10 === 0) {
          console.log(`\n📊 Progress: ${i + 1}/${results.length} completed`);
          console.log(`✅ Success: ${successCount}, ❌ Failures: ${failureCount}`);
          
          // Create a temporary file with current progress
          const tempFilename = `data/twoSnapShot-progress-${i + 1}.csv`;
          await writeCsvFile(processedResults, tempFilename);
        }
        
        // Add a delay between requests to avoid rate limiting
        if (i < results.length - 1) {
          console.log('Waiting 3 seconds before next request...');
          await sleep(3000);
        }
      }
      
      // Final save to the twoAddMetadata.csv file
      await writeCsvFile(processedResults, 'data/twoAddMetadata.csv');
      
      console.log(`\n🎉 Finished processing all articles for meta descriptions!`);
      console.log(`✅ Success: ${successCount}, ❌ Failures: ${failureCount}`);
      console.log(`📁 Final CSV file saved as data/twoAddMetadata.csv`);
      
      // Clean up temporary progress files
      console.log(`🧹 Cleaning up temporary progress files...`);
      for (let i = 10; i <= results.length; i += 10) {
        const tempFile = `data/twoSnapShot-progress-${i}.csv`;
        if (fs.existsSync(tempFile)) {
          fs.unlinkSync(tempFile);
        }
      }
      console.log(`✨ Cleanup complete!`);
    });
}

main(); 