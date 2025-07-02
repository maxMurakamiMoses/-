import prisma from '../src/lib/prisma'

async function main() {
  try {
    // 1. Set all blog posts to not_featured
    const resetResult = await prisma.blogPost.updateMany({
      data: { feature: 'not_featured' },
    });
    console.log(`Reset ${resetResult.count} blog posts to not_featured.`);

    // 2. Find the first 4 published blog posts by publishDate
    const posts = await prisma.blogPost.findMany({
      orderBy: { publishDate: 'asc' },
      take: 4,
      select: { id: true },
    });

    if (posts.length === 0) {
      console.log('No blog posts found.');
      return;
    }

    // 3. Set the first as main_feature
    await prisma.blogPost.update({
      where: { id: posts[0].id },
      data: { feature: 'main_feature' },
    });
    console.log(`Set blog post ${posts[0].id} as main_feature.`);

    // 4. Set the next three as stack_feature
    for (const post of posts.slice(1, 4)) {
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { feature: 'stack_feature' },
      });
      console.log(`Set blog post ${post.id} as stack_feature.`);
    }

    // 5. Count how many posts have each feature value
    const notFeaturedCount = await prisma.blogPost.count({ where: { feature: 'not_featured' } });
    const mainFeatureCount = await prisma.blogPost.count({ where: { feature: 'main_feature' } });
    const stackFeatureCount = await prisma.blogPost.count({ where: { feature: 'stack_feature' } });
    console.log(`\nBlog post feature counts:`);
    console.log(`not_featured: ${notFeaturedCount}`);
    console.log(`main_feature: ${mainFeatureCount}`);
    console.log(`stack_feature: ${stackFeatureCount}`);
  } catch (error) {
    console.error('Error updating blog posts:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 