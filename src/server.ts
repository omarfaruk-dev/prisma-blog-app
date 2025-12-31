import app from "./app";
import { prisma } from "./lib/prisma";

async function main() {
    try{
        await prisma.$connect();
        console.log("Database connected successfully.");

        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port: http://localhost:${process.env.PORT || 5000}`);
        });

    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();