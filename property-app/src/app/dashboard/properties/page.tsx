'use client'

import Search from '@/app/ui/dashboard/search';
import { CreateProperty } from '@/app/ui/properties/buttons';
import DisplayProperties from '@/app/ui/properties/displayProperties';
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
            <Suspense fallback={<div>Loading...</div>}>
                <DisplayProperties />
            </Suspense>
        </div>
    );
}


