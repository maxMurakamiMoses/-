import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

async function clearAllBlogContent() {
  try {
    console.log('🗑️  Starting to clear all blog post content...');
    
    // Get count of blog posts before clearing
    const totalPosts = await prisma.blogPost.count();
    console.log(`📊 Found ${totalPosts} blog posts in database`);
    
    if (totalPosts === 0) {
      console.log('ℹ️  No blog posts found to clear');
      return;
    }
    
    // Update all blog posts to set content to null
    const updateResult = await prisma.blogPost.updateMany({
      data: {
        content: null
      }
    });
    
    console.log('\n=== Clear Content Summary ===');
    console.log(`✅ Successfully cleared content for ${updateResult.count} blog posts`);
    console.log(`📊 Total blog posts in database: ${totalPosts}`);
    console.log(`🎉 All blog post content has been set to null!`);
    
  } catch (error) {
    console.error('❌ Clear content process failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the clear content process
clearAllBlogContent(); 