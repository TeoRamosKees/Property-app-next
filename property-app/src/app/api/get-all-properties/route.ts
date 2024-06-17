import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const properties = await sql`
            SELECT * 
            FROM properties 
            `;
            //return properties as a json response
            let data = properties.rows
            return NextResponse.json({ data }, { status: 200 });
    } catch (error: unknown) {
        throw new Error('Error getting properties');
    }
}