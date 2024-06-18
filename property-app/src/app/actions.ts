'use server'

import { sql } from '@vercel/postgres';
import { v4 } from 'uuid';
import { unstable_noStore as noStore } from 'next/cache';


interface Event {
    startDate: Date;
    endDate: Date;
    title: string;
}
type PropertyType = {
    id: number;
    property_id: string;
    user_id: string;
    name: string;
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

export const getAllProperties = async () => {
    noStore();
    try{
        const data = await sql<PropertyType>`SELECT * FROM properties`;
        console.log('Properties fetched successfully');
        
        return data.rows;
    } catch (error) {
        return { message: 'Error adding property' }
    }
}

export const getPropertiesByUserId = async (userId: string) => {
    noStore();
    try{
        const data = await sql<PropertyType>`SELECT * FROM properties WHERE user_id = ${userId}`;
        console.log('Properties fetched successfully');
        
        return data.rows;
    } catch (error) {
        return { message: 'Error adding property' }
    }
}