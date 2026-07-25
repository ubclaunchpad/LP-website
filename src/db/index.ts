import { PrismaClient } from "../../prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Extend the NodeJS.Global interface to include prisma
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let db: PrismaClient;

// Ensure process.env.DATABASE_URL is defined for production
if (process.env.NODE_ENV === "production" && process.env.DATABASE_URL) {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  db = new PrismaClient({ adapter });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }
  db = global.prisma;
}

export { db };
