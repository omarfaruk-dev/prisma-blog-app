import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

async function seedAdmin() {
    try {
        const adminData = {
            name: "Omar Faruk",
            email: "admin@prismablog.com",
            role: UserRole.ADMIN,
            password: "admin1234#",
            emailVerified: true
        }

        // Check if admin user already exists
        const existingAdmin = await prisma.user.findUnique({
            where: {
                email: adminData.email,
            }
        });

        if (existingAdmin) {
            console.log('Admin user already exists. Skipping seeding.');
            return;
        }

        const signUpAdmin = await fetch('http://localhost:5000/api/auth/sign-up/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': process.env.APP_URL || 'http://localhost:4000',
            },
            body: JSON.stringify(adminData),
        });

        console.log(signUpAdmin.status, signUpAdmin.statusText);
        const resData = await signUpAdmin.text();
        console.log(resData);


    } catch (error) {
        console.error('Error seeding admin:', error);
    }
}

seedAdmin();