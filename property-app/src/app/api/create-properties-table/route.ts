import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const result = await sql`
      CREATE TABLE IF NOT EXISTS properties (
        id serial PRIMARY KEY,
        property_id VARCHAR(255) NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL
      );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    console.error('Error creating table:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
