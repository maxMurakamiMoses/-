import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';

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

async function loadLatestProgress(outputFile) {
  const dir = path.dirname(outputFile);
  const base = path.basename(outputFile);
  const progressFiles = fs.readdirSync(dir)
    .filter(f => f.startsWith(base + '-progress-') && f.endsWith('.csv'));
  if (progressFiles.length === 0) return { processedResults: [], startIndex: 0 };
  // Find the highest progress file
  const max = Math.max(...progressFiles.map(f => parseInt(f.match(/progress-(\d+)\.csv$/)?.[1] || '0')));
  const latestFile = path.join(dir, `${base}-progress-${max}.csv`);
  // Read processed rows from latest progress file
  return new Promise((resolve) => {
    const processedResults = [];
    fs.createReadStream(latestFile)
      .pipe(csv())
      .on('data', (data) => processedResults.push(data))
      .on('end', () => resolve({ processedResults, startIndex: max }));
  });
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
      // Resume logic
      const { processedResults, startIndex } = await loadLatestProgress(outputFile);
      let translatedCount = processedResults.length;
      let emptyCount = 0;
      // Prepare headers for output CSV
      const headers = Object.keys(results[0] || {}).map(key => ({ id: key, title: key }));
      if (!headers.find(h => h.id === 'blogContent_japanese')) {
        headers.push({ id: 'blogContent_japanese', title: 'blogContent_japanese' });
      }
      for (let i = startIndex; i < results.length; i++) {
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
      // Write final output
      await writeCsvFile(processedResults, outputFile, headers);
      console.log(`\n🎉 Finished processing all blogContent translations!`);
      console.log(`✅ Translated: ${translatedCount}, 🚫 Empty: ${emptyCount}`);
      console.log(`📁 Final CSV file saved as ${outputFile}`);
      // Clean up temporary progress files
      const dir = path.dirname(outputFile);
      const base = path.basename(outputFile);
      const progressFiles = fs.readdirSync(dir)
        .filter(f => f.startsWith(base + '-progress-') && f.endsWith('.csv'));
      for (const tempFile of progressFiles) {
        const tempPath = path.join(dir, tempFile);
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
      }
      console.log(`✨ Cleanup complete!`);
    });
}

main(); 