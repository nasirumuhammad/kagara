"use server";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import { purchaseTable } from "@/src/db/schema";
import postgres from "postgres";
type Purchase = {
  userId: string;
  quantity: number;
  price: number;
  address: string;
  phone: string;
};
const client = postgres(process.env.DATABASE_URL!);
const database = drizzle({ client });
export async function createPurchase(formData: FormData): Promise<void> {
  const purchase = {
    userId: formData.get("userId") as string,
    price: parseInt(formData.get("price") as string, 10),
    quantity: parseInt(formData.get("quantity") as string, 10),
    phone: formData.get("phone") as string,
    address: formData.get("address") as string,
  };
  const { userId, price, quantity, phone, address } = purchase;
  let purchased = await database.insert(purchaseTable).values({ userId, price, quantity, phone, address });
}
export const fetchPurchase = async (userId: string) => {
  const purchase = await database.select().from(purchaseTable).where(eq(purchaseTable.userId, userId));
  return purchase;
};
export const fetchAllPurchase = async () => {
  const purchase = await database.select().from(purchaseTable);
  return purchase;
};

export const updataStatus = async (status: boolean, purchaseId: string) => {
  await database.update(purchaseTable).set({ confirmed: status }).where(eq(purchaseTable.id, purchaseId));
};
