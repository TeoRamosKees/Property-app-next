import Search from '@/app/ui/dashboard/search';
import { CreateProperty } from '@/app/ui/properties/buttons';
import DisplayProperties from '@/app/ui/properties/displayProperties';
import { Suspense } from 'react';
import { unstable_noStore as noStore } from 'next/cache';
import { CardsSkeleton }  from '@/app/ui/skeletons';


export default function Properties() {
    noStore();
    return (
        <div>
            <div className="my-4 flex content-center justify-center items-center gap-5">
                <Suspense fallback={<div>Loading...</div>}>
                    <Search placeholder="Search properties..." />
                </Suspense>
                <CreateProperty />
            </div>
            <Suspense fallback={<CardsSkeleton />}>
                <DisplayProperties />
            </Suspense>
        </div>
    );
}


