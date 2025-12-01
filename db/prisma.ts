import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

// ---- Create Base Client ----
function createPrismaClient() {
  return new PrismaClient({ adapter }).$extends({
    result: {
      product: {
        price: {
          compute(product) {
            return product.price.toString();
          },
        },
        rating: {
          compute(product) {
            return product.rating.toString();
          },
        },
      },
    },
  });
}

// ---- Global caching (Next.js dev mode) ----
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma =
  process.env.NODE_ENV === "production"
    ? createPrismaClient()
    : globalForPrisma.prisma ?? (globalForPrisma.prisma = createPrismaClient());

export default prisma;
