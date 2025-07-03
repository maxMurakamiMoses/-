const { PrismaClient } = require('../generated/prisma');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function exportPublishedBlogPosts() {
  try {
    console.log('Fetching published blog posts...');
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
    });

    const csvHeader = 'id,title,subtitle,metadata,category,content,publishDate,author_id,coverImage,isPublished,createdAt,updatedAt,feature\n';
    const csvRows = posts.map(post => {
      // Escape double quotes and replace newlines for CSV safety
      const escape = (str) => {
        if (str === null || str === undefined) return '';
        return '"' + String(str).replace(/"/g, '""').replace(/\n/g, ' ') + '"';
      };
      return [
        post.id, 
        post.title, 
        post.subtitle, 
        post.metadata, 
        post.category, 
        post.content, 
        post.publishDate, 
        post.author_id, 
        post.coverImage, 
        post.isPublished, 
        post.createdAt, 
        post.updatedAt, 
        post.feature
      ].map(escape).join(',');
    });

    const csvContent = csvHeader + csvRows.join('\n');
    const outputPath = path.join(__dirname, '../data/publishedBlogPosts.csv');
    fs.writeFileSync(outputPath, csvContent, 'utf8');
    console.log(`Exported ${posts.length} published blog posts to ${outputPath}`);
  } catch (error) {
    console.error('Error exporting published blog posts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

exportPublishedBlogPosts(); 