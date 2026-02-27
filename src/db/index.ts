import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

// Extend the NodeJS.Global interface to include prisma
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let db: PrismaClient;

// Ensure process.env.DATABASE_URL is defined for production
if (process.env.NODE_ENV === "production" && process.env.DATABASE_URL) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaNeon(pool);
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
