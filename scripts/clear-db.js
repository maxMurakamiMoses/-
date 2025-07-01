#!/usr/bin/env node

import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    console.log('🗑️  Clearing database...');
    
    // Delete all blog posts
    const deleteResult = await prisma.blogPost.deleteMany({});
    
    console.log(`✅ Successfully deleted ${deleteResult.count} blog posts from database`);
    console.log('🗄️  Database cleared successfully!');
    
  } catch (error) {
    console.error('❌ Error clearing database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the clear operation
clearDatabase(); 