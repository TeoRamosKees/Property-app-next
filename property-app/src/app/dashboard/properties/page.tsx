import { Card } from '@/app/ui/dashboard/cards';
import  Search  from '@/app/ui/dashboard/search';

export default function Properties() {
    return (
        <div>
            <h1>Properties page</h1>
            <Search placeholder='Search by name...' />
            <Card title="Total Properties" value={10} />
        </div>
    );}