import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

// Tabel Pertama: Users
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

// Tabel Kedua: Barang (Nama variabel dan nama tabel diubah)
export const produkTable = pgTable("produk", { 
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  namaBarang: varchar({ length: 255 }).notNull(),
  stock: integer().default(0),
  harga: integer().notNull(),
  createdAt: timestamp().defaultNow() 
})