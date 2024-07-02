'use server'


import { sql } from '@vercel/postgres';
import { v4 } from 'uuid';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { Event } from './ui/properties/calendar';
import { redirect } from 'next/navigation';
import { User } from '@/app/lib/definitions';
import { cookies } from 'next/headers';


// interface Event {
//     startDate: string;
//     endDate: string;
//     title: string;
// }

type PropertyType = {
    id: number;
    property_id: string;
    user_id: string;
    name: string;
}


export const addProperty = async ({userId, name}: {userId: string, name: string}) => {
    let propertyId = v4().toString();

    console.log(`Adding property with id: ${propertyId}`)
    try{
        console.log('Adding property');
        await sql`INSERT INTO properties (property_id, user_id, name) VALUES (${propertyId}, ${userId}, ${name})`;
        console.log('Property added successfully');
        
    } catch (error) {
        return { message: 'Error adding property' }
    }

    revalidatePath('/dashboard/properties');
    redirect('/dashboard/properties');
}

export const getAllProperties = async () => {
    noStore();
    try{
        const data = await sql<PropertyType>`SELECT * FROM properties`;
        
        return data.rows;
    } catch (error) {
        return { message: 'Error adding property' }
    }
}

export const getPropertiesByUserId = async (userId: string) => {
    noStore();
    try{
        const data = await sql<PropertyType>`SELECT * FROM properties WHERE user_id = ${userId}`;
        
        return data.rows;
    } catch (error) {
        return { message: 'Error adding property' }
    }
}

export const addReservation = async ({propertyId, startDate, endDate, title, color}: {propertyId: string, startDate: string, endDate: string, title: string, color: string}) => {
    try{
        console.log('Adding reservation');
        await sql`INSERT INTO reservations (property_id, start_date, end_date, title, color) VALUES (${propertyId}, ${startDate.toString()}, ${endDate.toString()}, ${title}, ${color})`;
        console.log(`${title}, ${color}`)
        console.log('Reservation added successfully');
    } catch (error) {
        return { message: 'Error adding reservation' }
    }
    revalidatePath(`/dashboard/properties/${propertyId}/calendar`);
    redirect(`/dashboard/properties/${propertyId}/calendar`);
}

export const getReservationsByPropertyId = async (propertyId: string) => {
    noStore(); 
    try{
        const data = await sql<Event>`SELECT * FROM reservations WHERE property_id = ${propertyId}`;
        console.log('Reservations fetched successfully');
        
        return data.rows;
    } catch (error) {
        return { message: 'Error fetching reservations'}
    }
}

export const deleteProperty = async (propertyId: string) => {
    try{
        console.log('Deleting property');
        await sql`DELETE FROM properties WHERE property_id = ${propertyId}`;
        await sql`DELETE FROM reservations WHERE property_id = ${propertyId}`;
        console.log('Property deleted successfully');
    } catch (error) {
        return { message: 'Error deleting property' }
    }
    revalidatePath('/dashboard/properties');
}

export const deleteReservation = async ({propertyId, startDate, endDate, title}: {propertyId: string, startDate: string, endDate: string, title: string}) => {
    try{
        console.log('Deleting reservation');
        await sql`DELETE FROM reservations WHERE property_id = ${propertyId} AND start_date = ${startDate} AND end_date = ${endDate} AND title = ${title}`;
        console.log('Reservation deleted successfully');
    } catch (error) {
        return { message: 'Error deleting reservation' }
    }
    revalidatePath(`/dashboard/properties/${propertyId}/calendar`);
    redirect(`/dashboard/properties/${propertyId}/calendar`);
}

export async function getUser(email: string): Promise<User | undefined> {
    try {
      const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
      console.log('User fetched:', user.rows[0]);
      return user.rows[0];
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }
