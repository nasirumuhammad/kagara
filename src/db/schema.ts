import { integer, pgTable, varchar, serial, boolean, date, uuid, index } from "drizzle-orm/pg-core";

export const purchaseTable = pgTable(
  "purchase_Table",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: varchar("userId", { length: 255 }),
    quantity: integer(),
    price: integer(),
    address: varchar("adress", { length: 255 }),
    phone: varchar("phone", { length: 255 }),
    confirmed: boolean().default(false),
    createdAt: date().defaultNow(),
  },
  (table) => ({
    purchaseTableIndex: index("purchase_table_index").on(table.id),
  })
);
