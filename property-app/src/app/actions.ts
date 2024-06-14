'use server'

import { sql } from '@vercel/postgres';
import { v4 } from 'uuid';

interface Event {
    startDate: Date;
    endDate: Date;
    title: string;
}


export const addProperty = async ({userId, name, reservations}: {userId: string, name: string, reservations: Event[]}) => {
    // make db call to add property
    let propertyId = v4().toString();

    console.log(`Adding property with id: ${propertyId}`)
    try{
        console.log('Adding property');
        await sql`INSERT INTO properties (property_id, user_id, name) VALUES (${propertyId}, ${userId}, ${name})`;
        console.log('Property added successfully');
        reservations.forEach(async (reservation) => {
            await sql`INSERT INTO reservations (property_id, start_date, end_date, title) VALUES (${propertyId}, ${reservation.startDate.toString()}, ${reservation.endDate.toString()}, ${reservation.title})`;
        });

    } catch (error) {
        return { message: 'Error adding property' }
    }
    

    return { message: 'Property added successfully' }
}