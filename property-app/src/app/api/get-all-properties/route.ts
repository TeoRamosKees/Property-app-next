import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const properties = await sql`
            SELECT * 
            FROM properties 
        `;
        let data = properties.rows;
        // Return properties as a JSON response with no-cache headers
        return NextResponse.json({ data }, { status: 200, headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' } });
    } catch (error) {
        console.error('Error getting properties:', error);
        return NextResponse.json({ error: 'Error getting properties' }, { status: 500 });
    }
}

