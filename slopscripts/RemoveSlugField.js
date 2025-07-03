const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function removeSlugField() {
  try {
    console.log('Starting to remove slug field from all BlogPosts...');
    
    // Get all blog posts
    const blogPosts = await prisma.blogPost.findMany();
    console.log(`Found ${blogPosts.length} blog posts to process`);
    
    let updatedCount = 0;
    
    // Update each blog post to remove the slug field
    for (const post of blogPosts) {
      try {
        // Use MongoDB's $unset operator to remove the slug field
        await prisma.$runCommandRaw({
          update: 'BlogPost',
          updates: [
            {
              q: { _id: post.id },
              u: { $unset: { slug: "" } }
            }
          ]
        });
        
        updatedCount++;
        console.log(`Removed slug field from blog post: ${post.title}`);
      } catch (error) {
        console.error(`Error removing slug from post "${post.title}":`, error);
      }
    }
    
    console.log(`Successfully removed slug field from ${updatedCount} blog posts`);
    
  } catch (error) {
    console.error('Error removing slug field:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
removeSlugField()
  .then(() => {
    console.log('Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  }); 