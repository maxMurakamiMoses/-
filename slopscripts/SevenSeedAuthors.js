import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

const authors = [
  {
    name: "Sarah Chen",
    twitter: "@sarahchen_tech",
    photo: "/profilepic.jpg",
    bio: "Sarah Chen is a seasoned software engineer with over 8 years of experience in full-stack development and cloud architecture. She specializes in building scalable web applications using modern technologies like React, Node.js, and AWS. Sarah is passionate about clean code practices and has led multiple successful projects from conception to deployment. She regularly contributes to open-source projects and mentors junior developers in her community. When not coding, Sarah enjoys hiking and experimenting with new programming languages."
  },
  {
    name: "Marcus Rodriguez",
    twitter: "@marcus_dev",
    photo: "/profilepic.jpg",
    bio: "Marcus Rodriguez is a senior developer advocate with a background in DevOps and system administration. He has worked with Fortune 500 companies to implement CI/CD pipelines and improve their development workflows. Marcus is known for his expertise in Docker, Kubernetes, and cloud-native technologies. He frequently speaks at tech conferences and writes technical articles about best practices in software development. His mission is to help developers build better, more reliable applications through automation and best practices."
  },
  {
    name: "Emily Watson",
    twitter: "@emilywatson_ai",
    photo: "/profilepic.jpg",
    bio: "Emily Watson is a machine learning engineer and data scientist with a PhD in Computer Science from Stanford University. She has developed AI models for healthcare, finance, and e-commerce applications, with a focus on ethical AI and responsible machine learning. Emily has published numerous research papers on deep learning and computer vision. She leads workshops on AI ethics and helps organizations implement responsible AI practices. Emily believes in making AI accessible to everyone and regularly contributes to educational initiatives in the field."
  },
  {
    name: "David Kim",
    twitter: "@davidkim_ux",
    photo: "/profilepic.jpg",
    bio: "David Kim is a UX/UI designer and frontend developer with a passion for creating intuitive user experiences. He has designed interfaces for mobile apps, web applications, and enterprise software used by millions of users worldwide. David specializes in user research, wireframing, and prototyping, with expertise in design systems and accessibility standards. He has worked with startups and established companies to improve their digital products and user engagement. David is also a design mentor and regularly shares insights about the intersection of design and technology."
  },
  {
    name: "Alexandra Thompson",
    twitter: "@alexthompson_dev",
    photo: "/profilepic.jpg",
    bio: "Alexandra Thompson is a cybersecurity expert and penetration tester with certifications in ethical hacking and security analysis. She has helped organizations identify and fix security vulnerabilities in their applications and infrastructure. Alexandra specializes in web application security, network security, and security automation. She conducts security audits and provides training to development teams on secure coding practices. Alexandra is committed to making the internet a safer place and regularly contributes to security research and bug bounty programs."
  }
];

function getRandomAuthorId(authors) {
  const idx = Math.floor(Math.random() * authors.length);
  return authors[idx].id;
}

async function seedAuthors() {
  try {
    console.log('🌱 Starting author seeding...');
    
    // Clear existing authors
    await prisma.author.deleteMany({});
    console.log('🗑️  Cleared existing authors');
    
    // Create new authors
    const createdAuthors = [];
    for (const author of authors) {
      const createdAuthor = await prisma.author.create({
        data: author
      });
      createdAuthors.push(createdAuthor);
      console.log(`✅ Created author: ${createdAuthor.name} (@${author.twitter})`);
    }
    
    console.log('🎉 Author seeding completed successfully!');
    console.log(`📊 Total authors created: ${authors.length}`);
    
    // Assign every blog post a random author
    console.log('\n📝 Assigning every blog post a random author...');
    const blogPosts = await prisma.blogPost.findMany();
    console.log(`📄 Found ${blogPosts.length} blog posts`);
    let count = 0;
    for (const post of blogPosts) {
      const randomAuthorId = getRandomAuthorId(createdAuthors);
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { author_id: randomAuthorId }
      });
      count++;
    }
    console.log(`\n🎯 Author assignment completed!`);
    console.log(`📊 Total blog posts assigned: ${count}`);
    
  } catch (error) {
    console.error('❌ Error seeding authors:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAuthors(); 