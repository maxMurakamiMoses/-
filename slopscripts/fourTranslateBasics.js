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
      { id: 'blogContent', title: 'blogContent' },
      { id: 'title_japanese', title: 'title_japanese' },
      { id: 'subtitle_japanese', title: 'subtitle_japanese' },
      { id: 'keywords_japanese', title: 'keywords_japanese' },
      { id: 'metadata_japanese', title: 'metadata_japanese' },
      { id: 'category_japanese', title: 'category_japanese' }
    ]
  });
  
  await csvWriter.writeRecords(data);
  console.log(`\n💾 Saved progress to ${filename} (${data.length} rows)`);
}

async function translateGroup1(title, subtitle, retryCount = 0) {
  try {
    const prompt = `Translate the following title and subtitle to Japanese. Use natural, casual Japanese that sounds conversational and engaging. Return the translations in this exact format:

Title: [Japanese translation]
Subtitle: [Japanese translation]

Content to translate:
Title: "${title}"
Subtitle: "${subtitle}"

Make the translations accurate but conversational - avoid overly formal or stiff language.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    // Parse the response to extract individual translations
    const responseText = response.text.trim();
    const lines = responseText.split('\n');
    
    let title_japanese = '';
    let subtitle_japanese = '';
    
    for (const line of lines) {
      if (line.startsWith('Title:')) {
        title_japanese = line.replace('Title:', '').trim();
      } else if (line.startsWith('Subtitle:')) {
        subtitle_japanese = line.replace('Subtitle:', '').trim();
      }
    }
    
    console.log(`Title: ${title}`);
    console.log(`Title (JP): ${title_japanese}`);
    console.log(`Subtitle: ${subtitle}`);
    console.log(`Subtitle (JP): ${subtitle_japanese}`);
    
    return { title_japanese, subtitle_japanese };
  } catch (error) {
    if (error.error?.code === 429 && retryCount < 3) {
      const waitTime = Math.pow(2, retryCount) * 30;
      console.log(`Rate limit hit. Waiting ${waitTime} seconds before retry ${retryCount + 1}/3...`);
      await sleep(waitTime * 1000);
      return translateGroup1(title, subtitle, retryCount + 1);
    } else {
      console.error(`Error translating group 1: ${error.message}`);
      return { title_japanese: title, subtitle_japanese: subtitle };
    }
  }
}

async function translateGroup2(keywords, metadata, retryCount = 0) {
  try {
    const prompt = `Translate the following keywords and metadata to Japanese. Use natural, casual Japanese that sounds conversational and engaging. Return the translations in this exact format:

Keywords: [Japanese translation]
Metadata: [Japanese translation]

Content to translate:
Keywords: "${keywords}"
Metadata: "${metadata}"

For keywords, translate each keyword separately and maintain the comma-separated format. Make the translations accurate but conversational - avoid overly formal or stiff language.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    // Parse the response to extract individual translations
    const responseText = response.text.trim();
    const lines = responseText.split('\n');
    
    let keywords_japanese = '';
    let metadata_japanese = '';
    
    for (const line of lines) {
      if (line.startsWith('Keywords:')) {
        keywords_japanese = line.replace('Keywords:', '').trim();
      } else if (line.startsWith('Metadata:')) {
        metadata_japanese = line.replace('Metadata:', '').trim();
      }
    }
    
    console.log(`Keywords: ${keywords}`);
    console.log(`Keywords (JP): ${keywords_japanese}`);
    console.log(`Metadata: ${metadata}`);
    console.log(`Metadata (JP): ${metadata_japanese}`);
    
    return { keywords_japanese, metadata_japanese };
  } catch (error) {
    if (error.error?.code === 429 && retryCount < 3) {
      const waitTime = Math.pow(2, retryCount) * 30;
      console.log(`Rate limit hit. Waiting ${waitTime} seconds before retry ${retryCount + 1}/3...`);
      await sleep(waitTime * 1000);
      return translateGroup2(keywords, metadata, retryCount + 1);
    } else {
      console.error(`Error translating group 2: ${error.message}`);
      return { keywords_japanese: keywords, metadata_japanese: metadata };
    }
  }
}

async function translateGroup3(category, retryCount = 0) {
  try {
    const prompt = `Translate the following category to Japanese. Use natural, casual Japanese that sounds conversational and engaging. Return the translation in this exact format:

Category: [Japanese translation]

Content to translate:
Category: "${category}"

Make the translation accurate but conversational - avoid overly formal or stiff language.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    // Parse the response to extract the translation
    const responseText = response.text.trim();
    const category_japanese = responseText.replace('Category:', '').trim();
    
    console.log(`Category: ${category}`);
    console.log(`Category (JP): ${category_japanese}`);
    
    return { category_japanese };
  } catch (error) {
    if (error.error?.code === 429 && retryCount < 3) {
      const waitTime = Math.pow(2, retryCount) * 30;
      console.log(`Rate limit hit. Waiting ${waitTime} seconds before retry ${retryCount + 1}/3...`);
      await sleep(waitTime * 1000);
      return translateGroup3(category, retryCount + 1);
    } else {
      console.error(`Error translating group 3: ${error.message}`);
      return { category_japanese: category };
    }
  }
}

async function processRow(row, retryCount = 0) {
  try {
    const { title, subtitle, keywords, metadata, category } = row;
    
    console.log(`\nProcessing translations for: ${title}`);
    console.log('─'.repeat(80));
    
    // Group 1: Title and Subtitle (1 API call)
    const group1 = await translateGroup1(title, subtitle);
    await sleep(2000); // Wait between API calls
    
    // Group 2: Keywords and Metadata (1 API call)
    const group2 = await translateGroup2(keywords, metadata);
    await sleep(2000);
    
    // Group 3: Category (1 API call)
    const group3 = await translateGroup3(category);
    
    console.log('─'.repeat(80));
    
    return {
      title_japanese: group1.title_japanese,
      subtitle_japanese: group1.subtitle_japanese,
      keywords_japanese: group2.keywords_japanese,
      metadata_japanese: group2.metadata_japanese,
      category_japanese: group3.category_japanese
    };
  } catch (error) {
    console.error(`Error processing row: ${error.message}`);
    return {
      title_japanese: row.title,
      subtitle_japanese: row.subtitle,
      keywords_japanese: row.keywords,
      metadata_japanese: row.metadata,
      category_japanese: row.category
    };
  }
}

async function main() {
  const results = [];
  
  // Read the cleaned CSV file
  fs.createReadStream('data/cleaned.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      console.log('Processing translations to Japanese...\n');
      
      let successCount = 0;
      let failureCount = 0;
      const processedResults = [];
      
      // Process each row
      for (let i = 0; i < results.length; i++) {
        const row = results[i];
        
        console.log(`Processing ${i + 1}/${results.length}...`);
        const translations = await processRow(row);
        
        if (translations) {
          // Create new row with original data plus Japanese translations
          const processedRow = {
            title: row.title,
            subtitle: row.subtitle,
            snippet: row.snippet,
            keywords: row.keywords,
            metadata: row.metadata,
            category: row.category,
            blogContent: row.blogContent,
            title_japanese: translations.title_japanese,
            subtitle_japanese: translations.subtitle_japanese,
            keywords_japanese: translations.keywords_japanese,
            metadata_japanese: translations.metadata_japanese,
            category_japanese: translations.category_japanese
          };
          processedResults.push(processedRow);
          successCount++;
          
          // Print the processed row data
          console.log('\n📝 Processed Row Data:');
          console.log(`Title: ${processedRow.title}`);
          console.log(`Title (JP): ${processedRow.title_japanese}`);
          console.log(`Subtitle: ${processedRow.subtitle}`);
          console.log(`Subtitle (JP): ${processedRow.subtitle_japanese}`);
          console.log(`Keywords: ${processedRow.keywords}`);
          console.log(`Keywords (JP): ${processedRow.keywords_japanese}`);
          console.log(`Metadata: ${processedRow.metadata}`);
          console.log(`Metadata (JP): ${processedRow.metadata_japanese}`);
          console.log(`Category: ${processedRow.category}`);
          console.log(`Category (JP): ${processedRow.category_japanese}`);
          console.log('─'.repeat(80));
        } else {
          // Keep the original data if processing failed
          const processedRow = {
            title: row.title,
            subtitle: row.subtitle,
            snippet: row.snippet,
            keywords: row.keywords,
            metadata: row.metadata,
            category: row.category,
            blogContent: row.blogContent,
            title_japanese: row.title,
            subtitle_japanese: row.subtitle,
            keywords_japanese: row.keywords,
            metadata_japanese: row.metadata,
            category_japanese: row.category
          };
          processedResults.push(processedRow);
          failureCount++;
          
          console.log('\n📝 Processed Row Data (Failed - using original):');
          console.log(`Title: ${processedRow.title}`);
          console.log(`Title (JP): ${processedRow.title_japanese}`);
          console.log('─'.repeat(80));
        }
        
        // Save progress after every 10 API calls
        if ((i + 1) % 10 === 0) {
          console.log(`\n📊 Progress: ${i + 1}/${results.length} completed`);
          console.log(`✅ Success: ${successCount}, ❌ Failures: ${failureCount}`);
          
          // Create a temporary file with current progress
          const tempFilename = `data/fourTranslateBasics-progress-${i + 1}.csv`;
          await writeCsvFile(processedResults, tempFilename);
        }
        
        // Add a delay between requests
        if (i < results.length - 1) {
          console.log('Waiting 3 seconds before next request...');
          await sleep(3000);
        }
      }
      
      // Final save to the fourTranslateBasics.csv file
      await writeCsvFile(processedResults, 'data/fourTranslateBasics.csv');
      
      console.log(`\n🎉 Finished processing all translations to Japanese!`);
      console.log(`✅ Success: ${successCount}, ❌ Failures: ${failureCount}`);
      console.log(`📁 Final CSV file saved as data/fourTranslateBasics.csv`);
      
      // Clean up temporary progress files
      console.log(`🧹 Cleaning up temporary progress files...`);
      for (let i = 10; i <= results.length; i += 10) {
        const tempFile = `data/fourTranslateBasics-progress-${i}.csv`;
        if (fs.existsSync(tempFile)) {
          fs.unlinkSync(tempFile);
        }
      }
      console.log(`✨ Cleanup complete!`);
    });
}

main(); 