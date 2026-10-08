const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial JobNest database...');

  const user1 = await prisma.user.upsert({
    where: { email: 'employer@techcorp.com' },
    update: {},
    create: {
      name: 'Budi Tech',
      email: 'employer@techcorp.com',
      password: 'password123',
      role: 'employer'
    }
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'candidate@dev.com' },
    update: {},
    create: {
      name: 'Siti Candidate',
      email: 'candidate@dev.com',
      password: 'password123',
      role: 'candidate'
    }
  });

  const catSoftware = await prisma.category.upsert({
    where: { slug: 'software-engineering' },
    update: {},
    create: {
      name: 'Software Engineering',
      slug: 'software-engineering'
    }
  });

  const company = await prisma.company.create({
    data: {
      userId: user1.id,
      name: 'TechCorp Indonesia',
      description: 'Perusahaan teknologi terdepan',
      location: 'Jakarta',
      website: 'https://techcorp.co.id'
    }
  });

  const job = await prisma.job.create({
    data: {
      companyId: company.id,
      categoryId: catSoftware.id,
      title: 'Backend Developer Express.js',
      description: 'Bertanggung jawab membangun API RESTful scalable.',
      salary: 12000000,
      jobType: 'FULL_TIME',
      location: 'Jakarta (Hybrid)'
    }
  });

  await prisma.application.create({
    data: {
      jobId: job.id,
      userId: user2.id,
      resumeUrl: 'https://drive.google.com/my-resume.pdf',
      notes: 'Saya berpengalaman 2 tahun di Node.js',
      status: 'PENDING'
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });