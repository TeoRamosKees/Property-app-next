"use client"

import { eachDayOfInterval, endOfMonth, format, getDay, startOfMonth } from "date-fns";

//weekdays in spanish
const WEEKDAYS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];


export default function PropertyCalendar() { 
    
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);

    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth
    });
    
    const startingDayIndex = getDay(firstDayOfMonth);

    return ( 
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <h2 className="text-center">{format(currentDate, 'MMMM yyyy')}</h2>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {WEEKDAYS.map((day) => {
                    return (
                        <div key={day} className="text-center border font-bold">
                            {day}
                        </div>
                    );
                })};
                {Array.from({ length: startingDayIndex }).map((_, index) => {
                    return (
                        <div key={`empty-${index}`} className="text-center border rounded-md p-2 h-20"/>
                    );
                })
                }
                {daysInMonth.map((day, index) => {
                    return (
                        <div key={index} className="text-center border rounded-md p-2 hover:bg-black hover:text-white h-20">
                            {format(day, 'd')}
                        </div>
                    );
                })};
            </div>
        </div>
    ); 
}
