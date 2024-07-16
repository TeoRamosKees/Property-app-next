'use server'


import { sql } from '@vercel/postgres';
import { v4 } from 'uuid';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { Event } from './ui/properties/calendar';
import { redirect } from 'next/navigation';
import { User } from '@/app/lib/definitions';
import { cookies } from 'next/headers';
const bcrypt = require('bcrypt');


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

export const addReservation = async ({propertyId, startDate, endDate, title, color, hosts}: {propertyId: string, startDate: string, endDate: string, title: string, color: string, hosts:number}) => {
    try{
        console.log('Adding reservation');
        await sql`
        INSERT INTO reservations (property_id, start_date, end_date, title, color, hosts) 
        VALUES (${propertyId}, ${startDate.toString()}, ${endDate.toString()}, ${title}, ${color}, ${hosts})
        `;
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
        await sql`DELETE FROM reservationPayment WHERE property_id = ${propertyId}`
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

export async function addUser({name, email, password}: {name: string, email: string, password: string}) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await sql`
            INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword});
        `;
        console.log('User inserted');
    } catch (error) {
        console.error('Error inserting user:', error);
        return { message: 'Error inserting user' }
    }
    redirect('/login');
}
// Payment: {property_id, reservation_id, detail,  amount}
export async function addPayment({property_id, reservation_id, detail, amount}: {property_id: string, reservation_id: string, detail: string, amount: number}) {
    try {
        await sql`
            INSERT INTO reservationPayment (property_id, reservation_id, detail, amount) VALUES (${property_id}, ${reservation_id}, ${detail}, ${amount});
        `;
        console.log('Payment inserted');
    } catch (error) {
        console.error('Error inserting payment:', error);
        return { message: 'Error inserting payment' }
    }
    revalidatePath(`/dashboard/properties/${property_id}/calendar/${reservation_id}`);
    redirect(`/dashboard/properties/${property_id}/calendar/${reservation_id}`);
}

export async function getPaymentsByReservationId(reservation_id: string) {
    noStore();
    try{
        const data = await sql`SELECT * FROM reservationPayment WHERE reservation_id = ${reservation_id}`;
        console.log('Payments fetched successfully');
        
        return data.rows;
    } catch (error) {
        return { message: 'Error fetching payments'}
    }
}

export async function editPayment(payment_id: string, {detail, amount}: {detail: string, amount: number}, reservation_id: string) {
    try {
        await sql`
            UPDATE reservationPayment 
            SET detail = ${detail}, amount = ${amount} 
            WHERE id = ${payment_id};
        `;
        console.log('Payment updated');
    } catch (error) {
        console.error('Error updating payment:', error);
        return { message: 'Error updating payment' }
    }
    revalidatePath(`/dashboard/properties/${payment_id}/calendar/${reservation_id}`);
}

export async function deletePayment(payment_id: string, reservation_id: string) {
    try {
        await sql`
            DELETE FROM reservationPayment WHERE id = ${payment_id};
        `;
        console.log('Payment deleted');
    } catch (error) {
        console.error('Error deleting payment:', error);
        return { message: 'Error deleting payment' }
    }
    revalidatePath(`/dashboard/properties/${payment_id}/calendar/${reservation_id}`);
}

export async function getReservationById(reservation_id: any): Promise<Event | undefined> {
    try {
        const data = await sql<Event>`SELECT * FROM reservations WHERE id = ${reservation_id}`;
        console.log('Reservation fetched successfully', data.rows[0]);
        
        return data.rows[0];
    } catch (error) {
        console.error('Error fetching reservation:', error);
        throw new Error('Error fetching reservation');
    }
}

export async function updateReservation(reservation_id: string, {startDate, endDate, title, color, hosts}: {startDate: string, endDate: string, title: string, color: string, hosts: number}, property_id: string) {
    try {
        await sql`
            UPDATE reservations 
            SET start_date = ${startDate}, end_date = ${endDate}, title = ${title}, color = ${color}, hosts = ${hosts}
            WHERE id = ${reservation_id};
        `;
        console.log('Reservation updated');
    } catch (error) {
        console.error('Error updating reservation:', error);
        return { message: 'Error updating reservation' }
    }
    revalidatePath(`/dashboard/properties/${property_id}/calendar/${reservation_id}`);
    revalidatePath(`/dashboard/properties/${property_id}/calendar/${reservation_id}/edit`);
    revalidatePath(`/dashboard/properties/${property_id}/calendar`);
    redirect(`/dashboard/properties/${property_id}/calendar/${reservation_id}`);
}

export async function addReservationFeedback({property_id, reservation_id, feedback}: {property_id: string, reservation_id: string, feedback: string}) {
    try {
        await sql`
            INSERT INTO reservationfeedback (reservation_id, feedback) VALUES (${reservation_id}, ${feedback});
        `;
        console.log('Feedback inserted');
    } catch (error) {
        console.error('Error inserting feedback:', error);
        return { message: 'Error inserting feedback' }
    }
    revalidatePath(`/dashboard/properties/${property_id}/calendar/${reservation_id}`);
    redirect(`/dashboard/properties/${property_id}/calendar/${reservation_id}`);
}

export async function getReservationFeedback(reservation_id: string) {
    noStore();
    try{
        const data = await sql`SELECT * FROM reservationfeedback WHERE reservation_id = ${reservation_id}`;
        console.log('Feedback fetched successfully');
        
        return data.rows;
    } catch (error) {
        return { message: 'Error fetching feedback'}
    }
}

export async function redirectPage(page: string) {
    redirect(page);
}