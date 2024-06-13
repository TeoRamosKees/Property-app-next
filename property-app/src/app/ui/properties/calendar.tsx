"use client";

import clsx from "clsx";
import { eachDayOfInterval, endOfMonth, format, getDay, startOfMonth } from "date-fns";

// weekdays in Spanish
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
            <div className="grid grid-cols-7 gap 2 mb-5">
                <div />
                <div>
                    <button className="bg-slate-700 text-white rounded-md p-2 hover:bg-slate-900">Año anterior</button>
                </div>
                <div>
                    <button className="bg-slate-700 text-white rounded-md p-2 hover:bg-slate-900">Mes anterior</button>
                </div>
                <div className="mb-4">
                    <h2 className="text-center">{format(currentDate, 'MMMM yyyy')}</h2>
                </div>
                <div>
                    <button className="bg-slate-700 text-white rounded-md p-2 hover:bg-slate-900">Mes siguiente</button>
                </div>
                <div>
                    <button className="bg-slate-700 text-white rounded-md p-2 hover:bg-slate-900">Año siguiente</button>
                </div> 
            </div>
            <div className="grid grid-cols-7 gap-2">
                {WEEKDAYS.map((day) => (
                    <div key={day} className="text-center border font-bold">
                        {day}
                    </div>
                ))}
                {Array.from({ length: startingDayIndex }).map((_, index) => (
                    <div key={`empty-${index}`} className="text-center border rounded-md p-2 h-20" />
                ))}
                {/* add different style to current day by using clsx  "text-center border rounded-md p-2 hover:bg-black hover:text-white h-20"*/}
                {daysInMonth.map((day, index) => (
                    <div key={index} className={clsx(
                        "text-center border rounded-md p-2 h-20 hover:bg-black hover:text-white",
                        format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') && 'bg-slate-700 text-white'
                    )}>
                        {format(day, 'd')}
                    </div>
                ))}
            </div>
        </div>
    ); 
}
