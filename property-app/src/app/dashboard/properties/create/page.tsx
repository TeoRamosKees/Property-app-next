import PropertyCalendar from '@/app/ui/properties/calendar';
import { addDays, subDays } from 'date-fns';

export default function CreateProperty() {
    return (
        <div>
            <PropertyCalendar 
                events={[
                    {
                        startDate: subDays(new Date(), 5),
                        endDate: subDays(new Date(), 1),
                        title: "Alqiuler de Junio a Juan lubro"
                    },
                    {
                        startDate: addDays(new Date(), 1),
                        endDate: addDays(new Date(), 5),
                        title: "Test event 2"
                    }
                ]}
            />
        </div>
    );
}