import { neon } from "@neondatabase/serverless";

export const sql=neon(process.env.NEONDB_URL)