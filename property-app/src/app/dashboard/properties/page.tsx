import PropertyCard, { Card } from '@/app/ui/dashboard/cards';
import Search from '@/app/ui/dashboard/search';
import { CreateProperty } from '@/app/ui/properties/buttons';
import { Suspense } from 'react';

interface PropertyType {
    id: number;
    property_id: string;
    user_id: string;
    name: string;
}

async function fetchProperties() {
    const response = await fetch('http://localhost:3000/api/get-all-properties', {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Fetched properties data:', data); // Log the fetched data
    return data;
}

export default async function Properties() {
    let properties: PropertyType[] = [];
    try {
        const data = await fetchProperties();
        properties = data.properties.rows; // Access the rows array within properties
        console.log('Properties array:', properties); // Log the properties array
    } catch (error) {
        console.error('Failed to fetch properties:', error);
    }

    return (
        <div>
            <div className="my-4 flex content-center justify-center items-center gap-5">
                <Suspense fallback={<div>Loading...</div>}>
                    <Search placeholder="Search properties..." />
                </Suspense>
                <CreateProperty />
            </div>
            <div className='grid grid-cols-3'>
                {properties && properties.length > 0 ? (
                    properties.map((property) => (
                        <div key={property.id} className="property-card mb-10">
                            <PropertyCard title={property.name} id={`${property.id}`} />
                        </div>    
                    ))
                ) : (
                    <p>No properties available.</p>
                )}
            </div>
        </div>
    );
}

