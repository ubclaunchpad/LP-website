import { PrismaClient } from "../../prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Extend the NodeJS.Global interface to include prisma
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let db: PrismaClient;

// The prisma-client generator requires a driver adapter for the connection;
// the `datasources` option is no longer accepted by the client constructor.
function createClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  return new PrismaClient({ adapter });
}

if (process.env.NODE_ENV === "production") {
  db = createClient();
} else {
  // Reuse a single client across hot reloads in development to avoid
  // exhausting database connections.
  if (!global.prisma) {
    global.prisma = createClient();
  }
  db = global.prisma;
}

export { db };
