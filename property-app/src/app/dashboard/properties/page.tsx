import { Card } from '@/app/ui/dashboard/cards';
import  Search  from '@/app/ui/dashboard/search';
import { CreateProperty } from '@/app/ui/properties/buttons';
import { Suspense } from 'react'; 

export default function Properties() {
    return (
        <div>
            <div className="my-4 flex content-center justify-center items-center gap-5">
                <Suspense fallback={<div>Loading...</div>}>    
                    <Search placeholder="Search properties..." />
                </Suspense>
                <CreateProperty />
            </div>
            {/* Send properties as an array and build all cards based on that array */}
            <Card title="Total Properties" value={10} />
        </div>
    );}