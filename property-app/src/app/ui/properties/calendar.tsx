"use client";

import clsx from "clsx";
import { addMonths, eachDayOfInterval, endOfMonth, format, getDay, startOfMonth } from "date-fns";
import { useEffect, useState } from "react";

// weekdays in Spanish
const WEEKDAYS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

export default function PropertyCalendar() { 
    const [currentDate, setCurrentDate] = useState(new Date());
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(startOfMonth(currentDate));
    const [lastDayOfMonth, setLastDayOfMonth] = useState(endOfMonth(currentDate));
    const [startingDayIndex, setStartingDayIndex] = useState(getDay(firstDayOfMonth));

    useEffect(() => {
        setFirstDayOfMonth(startOfMonth(currentDate));
        setLastDayOfMonth(endOfMonth(currentDate));
        setStartingDayIndex(getDay(startOfMonth(currentDate)));
    }, [currentDate]);

    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth
    });

    function handleButton(n: string) {
        switch (n) {
            case "1":
                setCurrentDate(addMonths(currentDate, -12));
                break;
            case "2":
                setCurrentDate(addMonths(currentDate, -1));
                break;
            case "3":
                setCurrentDate(addMonths(currentDate, 1));
                break;
            case "4":
                setCurrentDate(addMonths(currentDate, 12));
                break;
            default:
                console.log("Invalid option");
        }
    }

    return ( 
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-7 gap 2 mb-5">
                <div />
                <div className="flex flex-col items-center">
                    <button className="bg-slate-700 text-white rounded-md p-2 hover:bg-slate-900" onClick={() => handleButton("1")}>Año anterior</button>
                </div>
                <div className="flex flex-col items-center">
                    <button className="bg-slate-700 text-white rounded-md p-2 hover:bg-slate-900" onClick={() => handleButton("2")}>Mes anterior</button>
                </div>
                <div className="mb-4">
                    <h2 className="text-center">{format(currentDate, 'MMMM yyyy')}</h2>
                </div>
                <div className="flex flex-col items-center">
                    <button className="bg-slate-700 text-white rounded-md p-2 hover:bg-slate-900" onClick={() => handleButton("3")}>Mes siguiente</button>
                </div>
                <div className="flex flex-col items-center">
                    <button className="bg-slate-700 text-white rounded-md p-2 hover:bg-slate-900" onClick={() => handleButton("4")}>Año siguiente</button>
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
