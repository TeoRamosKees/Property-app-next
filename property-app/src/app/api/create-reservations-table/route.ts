import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const result = await sql`
      CREATE TABLE IF NOT EXISTS reservations (
        id serial PRIMARY KEY,
        property_id VARCHAR(255) NOT NULL,
        start_date VARCHAR(255) NOT NULL,
        end_date VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        color VARCHAR(255) NOT NULL
      );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    console.error('Error creating table:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}