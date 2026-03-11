import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        // Create mock user
        const user = await prisma.user.upsert({
            where: { phone: '9876543210' },
            update: {},
            create: {
                phone: '9876543210',
                name: 'Ramesh Kumar',
                city: 'Delhi',
                language: 'hi',
                kycStatus: 'verified',
            },
        });

        // Create worker profile
        await prisma.workerProfile.upsert({
            where: { userId: user.id },
            update: {},
            create: {
                userId: user.id,
                skills: JSON.stringify(['Plumber', 'Electrician']),
                experienceYears: 5,
                dailyRate: 800,
                serviceRadiusKm: 10,
                portfolioImages: JSON.stringify([]),
                availability: true,
                rating: 4.5,
                ratingCount: 23,
            },
        });

        console.log('Seed data created successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
