import prisma from '../src/lib/prisma'

// CONFIGURATION - Change these values as needed
const OLD_CATEGORY = "Quitting Porn (Core Guides)";  // The category to find
const NEW_CATEGORY = "Guides";              // The new category name

async function main() {
  try {
    console.log(`Starting category name update...`);
    console.log(`Changing from "${OLD_CATEGORY}" to "${NEW_CATEGORY}"`);

    // Find all blog posts with the old category name
    const postsToUpdate = await prisma.blogPost.findMany({
      where: {
        category: OLD_CATEGORY
      },
      select: {
        id: true,
        title: true,
        category: true
      }
    });

    console.log(`Found ${postsToUpdate.length} blog posts with category "${OLD_CATEGORY}"`);

    if (postsToUpdate.length === 0) {
      console.log(`No posts found with category "${OLD_CATEGORY}". Nothing to update.`);
      return;
    }

    // Show what will be updated
    console.log('\nPosts that will be updated:');
    postsToUpdate.forEach(post => {
      console.log(`- ${post.title}`);
    });

    // Update all matching posts
    const updateResult = await prisma.blogPost.updateMany({
      where: {
        category: OLD_CATEGORY
      },
      data: {
        category: NEW_CATEGORY
      }
    });

    console.log(`\n✅ Successfully updated ${updateResult.count} blog posts`);
    console.log(`Category changed from "${OLD_CATEGORY}" to "${NEW_CATEGORY}"`);

    // Verify the changes
    const updatedPosts = await prisma.blogPost.findMany({
      where: {
        category: NEW_CATEGORY
      },
      select: {
        id: true,
        title: true,
        category: true
      }
    });

    console.log(`\nVerification: Found ${updatedPosts.length} posts with category "${NEW_CATEGORY}"`);

    // Count all categories for reference
    const categoryCounts = await prisma.blogPost.groupBy({
      by: ['category'],
      _count: {
        category: true
      },
      orderBy: {
        _count: {
          category: 'desc'
        }
      }
    });

    console.log('\nCurrent category distribution:');
    categoryCounts.forEach(cat => {
      console.log(`- ${cat.category || 'null'}: ${cat._count.category} posts`);
    });

  } catch (error) {
    console.error('Error updating blog post categories:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 