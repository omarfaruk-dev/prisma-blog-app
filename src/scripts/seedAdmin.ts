import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

async function seedAdmin() {
    try {
        console.log("admin seeding started........");
        const adminData = {
            name: "Omar Faruk",
            email: "admin3@admin.com",
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

        //manually add email verified to true since we are seeding the admin user
        if(signUpAdmin.ok) {
            console.log("admin created");
        await prisma.user.update({
            where: {
                email: adminData.email,
            },
            data: {
                emailVerified: true,
            }
        })
        console.log("email verify status updated");
        }

        console.log("****success****");


    } catch (error) {
        console.error('Error seeding admin:', error);
    }
}

seedAdmin();