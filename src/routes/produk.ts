import { Elysia, t } from "elysia";
import { db } from "../db/index";
import { produkTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const produkRoute = new Elysia({
    prefix: "/produk"
});

// validasi id di URL (otomatis diubah dari string jadi angka)
const idParam = t.Object({ id: t.Numeric() });

// validasi body untuk create & update
const produkBody = t.Object({
    namaBarang: t.String({ minLength: 1 }),
    stock: t.Optional(t.Number()),
    harga: t.Number()
});

// READ semua
produkRoute.get("/", async () => {
    const data = await db.select().from(produkTable);
    return data;
});

// READ satu
produkRoute.get("/:id", async ({ params, set }) => {
    const [data] = await db.select()
        .from(produkTable)
        .where(eq(produkTable.id, params.id));
    if (!data) {
        set.status = 404;
        return { error: "Produk tidak ditemukan" };
    }
    return data;
}, { params: idParam });

// 1. CREATE produk
produkRoute.post("/", async ({ body, set }) => {
    const [data] = await db.insert(produkTable)
        .values(body)
        .returning();
    set.status = 201;
    return data;
}, { body: produkBody });

// 3. UPDATE produk
produkRoute.put("/:id", async ({ params, body, set }) => {
    const [data] = await db.update(produkTable)
        .set(body)
        .where(eq(produkTable.id, params.id))
        .returning();
    if (!data) {
        set.status = 404;
        return { error: "Produk tidak ditemukan" };
    }
    return data;
}, { params: idParam, body: produkBody });

// 4. DELETE produk
produkRoute.delete("/:id", async ({ params, set }) => {
    const [data] = await db.delete(produkTable)
        .where(eq(produkTable.id, params.id))
        .returning();
    if (!data) {
        set.status = 404;
        return { error: "Produk tidak ditemukan" };
    }
    return { message: "Produk berhasil dihapus", data };
}, { params: idParam });