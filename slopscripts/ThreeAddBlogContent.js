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
      { id: 'category', title: 'category' },
      { id: 'blogContent', title: 'blogContent' }
    ]
  });
  
  await csvWriter.writeRecords(data);
  console.log(`\n💾 Saved progress to ${filename} (${data.length} rows)`);
}

async function processRow(title, subtitle, keywords, metadata, retryCount = 0) {
  try {
    const prompt = `Create a comprehensive, engaging blog post in MDX format about: "${title}"

Subtitle: "${subtitle}"
Keywords to incorporate naturally: "${keywords}"
Meta description: "${metadata}"

Requirements:
- Write 1200-2000 words of high-quality, informative content
- Format in MDX with proper markdown syntax (## for h2, ### for h3, etc.)
- Include relevant lists, tables, and structured content where appropriate
- Incorporate the target keywords naturally throughout the content
- Make it easy to read with good flow and engaging writing
- Cite relevant data, studies, or statistics when appropriate
- Include practical tips, actionable advice, or step-by-step guidance
- Structure with clear headings and subheadings
- End with a compelling conclusion

The content should be informative, well-researched, and valuable to readers interested in this topic. Use MDX formatting for all structural elements.

Return only the MDX-formatted blog content, no additional text or formatting.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    console.log(`\nTitle: ${title}`);
    console.log(`Subtitle: ${subtitle}`);
    console.log(`Keywords: ${keywords}`);
    console.log(`Word count: ${response.text.split(' ').length} words`);
    console.log('─'.repeat(80));
    
    return response.text.trim(); // Return the blog content
  } catch (error) {
    if (error.error?.code === 429 && retryCount < 3) {
      // Rate limit hit - implement exponential backoff
      const waitTime = Math.pow(2, retryCount) * 30; // 30s, 60s, 120s
      console.log(`Rate limit hit. Waiting ${waitTime} seconds before retry ${retryCount + 1}/3...`);
      await sleep(waitTime * 1000);
      return processRow(title, subtitle, keywords, metadata, retryCount + 1);
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
  fs.createReadStream('data/twoAddMetadata.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      console.log('Processing blog articles for content generation...\n');
      
      let successCount = 0;
      let failureCount = 0;
      const processedResults = [];
      
      // Process each row
      for (let i = 0; i < results.length; i++) {
        const row = results[i];
        const { title, subtitle, snippet, keywords, metadata, category } = row;
        
        console.log(`Processing ${i + 1}/${results.length}...`);
        const generatedBlogContent = await processRow(title, subtitle, keywords, metadata);
        
        if (generatedBlogContent) {
          // Create new row with generated blog content
          const processedRow = {
            title: title,
            subtitle: subtitle,
            snippet: snippet,
            keywords: keywords,
            metadata: metadata,
            category: category || '',
            blogContent: generatedBlogContent
          };
          processedResults.push(processedRow);
          successCount++;
          
          // Print the processed row data
          console.log('\n📝 Processed Row Data:');
          console.log(`Title: ${processedRow.title}`);
          console.log(`Subtitle: ${processedRow.subtitle}`);
          console.log(`Keywords: ${processedRow.keywords}`);
          console.log(`Metadata: ${processedRow.metadata}`);
          console.log(`Category: ${processedRow.category}`);
          console.log(`Blog Content Length: ${processedRow.blogContent.length} characters`);
          console.log('─'.repeat(80));
        } else {
          // Keep the original data if processing failed
          const processedRow = {
            title: title,
            subtitle: subtitle,
            snippet: snippet,
            keywords: keywords,
            metadata: metadata,
            category: category || '',
            blogContent: '' // Empty blog content if processing failed
          };
          processedResults.push(processedRow);
          failureCount++;
          
          // Print the processed row data
          console.log('\n📝 Processed Row Data (Failed):');
          console.log(`Title: ${processedRow.title}`);
          console.log(`Subtitle: ${processedRow.subtitle}`);
          console.log(`Keywords: ${processedRow.keywords}`);
          console.log(`Metadata: ${processedRow.metadata}`);
          console.log(`Category: ${processedRow.category}`);
          console.log(`Blog Content: ${processedRow.blogContent}`);
          console.log('─'.repeat(80));
        }
        
        // Save progress after every 5 API calls (since these are longer requests)
        if ((i + 1) % 5 === 0) {
          console.log(`\n📊 Progress: ${i + 1}/${results.length} completed`);
          console.log(`✅ Success: ${successCount}, ❌ Failures: ${failureCount}`);
          
          // Create a temporary file with current progress
          const tempFilename = `data/threeSnapShot-progress-${i + 1}.csv`;
          await writeCsvFile(processedResults, tempFilename);
        }
        
        // Add a longer delay between requests since these are content generation requests
        if (i < results.length - 1) {
          console.log('Waiting 5 seconds before next request...');
          await sleep(5000);
        }
      }
      
      // Final save to the threeAddBlog.csv file
      await writeCsvFile(processedResults, 'data/threeAddBlog.csv');
      
      console.log(`\n🎉 Finished processing all articles for blog content!`);
      console.log(`✅ Success: ${successCount}, ❌ Failures: ${failureCount}`);
      console.log(`📁 Final CSV file saved as data/threeAddBlog.csv`);
      
      // Clean up temporary progress files
      console.log(`🧹 Cleaning up temporary progress files...`);
      for (let i = 5; i <= results.length; i += 5) {
        const tempFile = `data/threeSnapShot-progress-${i}.csv`;
        if (fs.existsSync(tempFile)) {
          fs.unlinkSync(tempFile);
        }
      }
      console.log(`✨ Cleanup complete!`);
    });
}

main(); 