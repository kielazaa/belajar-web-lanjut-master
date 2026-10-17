import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

// prepare: false wajib karena Supabase pooler port 6543 (Transaction pooler)
const client = postgres(process.env.DATABASE_URL!, { prepare: false });
export const db = drizzle({ client });