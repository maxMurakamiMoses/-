import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';

const ai = new GoogleGenAI({});

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function writeCsvFile(data, filename, headers) {
  const csvWriter = createObjectCsvWriter({
    path: filename,
    header: headers
  });
  await csvWriter.writeRecords(data);
  console.log(`\n💾 Saved progress to ${filename} (${data.length} rows)`);
}

async function translateBlogContentToJapanese(blogContent, retryCount = 0) {
  try {
    const prompt = `Translate the following blog post content to Japanese - Use natural, casual Japanese that sounds conversational and engaging.. Keep the exact same MDX formatting, just change the language. Do not add or remove any markdown or MDX elements, just translate the text content. Return only the translated MDX content, nothing else.\n\n${blogContent}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    if (error.error?.code === 429 && retryCount < 3) {
      const waitTime = Math.pow(2, retryCount) * 30;
      console.log(`Rate limit hit. Waiting ${waitTime} seconds before retry ${retryCount + 1}/3...`);
      await sleep(waitTime * 1000);
      return translateBlogContentToJapanese(blogContent, retryCount + 1);
    } else {
      console.error(`Error translating blogContent: ${error.message}`);
      return '';
    }
  }
}

async function main() {
  const results = [];
  const inputFile = 'data/fourTranslateBasics.csv';
  const outputFile = 'data/fiveTranslateBlogContent.csv';

  // Read the CSV file
  fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      console.log('Processing blogContent translations to Japanese...\n');
      const processedResults = [];
      let translatedCount = 0;
      let emptyCount = 0;

      // Prepare headers for output CSV
      const headers = Object.keys(results[0] || {}).map(key => ({ id: key, title: key }));
      headers.push({ id: 'blogContent_japanese', title: 'blogContent_japanese' });

      for (let i = 0; i < results.length; i++) {
        const row = results[i];
        const blogContent = row.blogContent || '';
        let blogContent_japanese = '';

        if (blogContent.trim() === '') {
          console.log(`Row ${i + 1}: blogContent is empty. Skipping translation.`);
          emptyCount++;
        } else {
          console.log(`Row ${i + 1}: Translating blogContent (${blogContent.length} chars)...`);
          blogContent_japanese = await translateBlogContentToJapanese(blogContent);
          translatedCount++;
        }

        processedResults.push({ ...row, blogContent_japanese });

        // Save progress every 10 rows
        if ((i + 1) % 10 === 0) {
          await writeCsvFile(processedResults, `${outputFile}-progress-${i + 1}.csv`, headers);
        }
        if (i < results.length - 1) {
          await sleep(2000);
        }
      }

      await writeCsvFile(processedResults, outputFile, headers);
      console.log(`\n🎉 Finished processing all blogContent translations!`);
      console.log(`✅ Translated: ${translatedCount}, 🚫 Empty: ${emptyCount}`);
      console.log(`📁 Final CSV file saved as ${outputFile}`);

      // Clean up temporary progress files
      for (let i = 10; i <= results.length; i += 10) {
        const tempFile = `${outputFile}-progress-${i}.csv`;
        if (fs.existsSync(tempFile)) {
          fs.unlinkSync(tempFile);
        }
      }
      console.log(`✨ Cleanup complete!`);
    });
}

main(); 