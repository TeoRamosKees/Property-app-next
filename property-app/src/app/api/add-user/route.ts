import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
const bcrypt = require('bcrypt');

 
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const password = searchParams.get('password');
    const name = searchParams.get('name');
  
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }
  
    try {
      
      const result = await sql`
        INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${password});
      `;
      console.log('User inserted:', result);
      return NextResponse.json({ result }, { status: 200 });
    } catch (error: any) {
      console.error('Error inserting user:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

