import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Extend the NodeJS.Global interface to include prisma
declare global {
  var prisma: PrismaClient | undefined;
}

let db: PrismaClient;

// Ensure process.env.DATABASE_URL is defined for production
if (process.env.NODE_ENV === "production" && process.env.DATABASE_URL) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool as any);
  db = new PrismaClient({ adapter: adapter as any });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  db = global.prisma;
}

export { db };
