"use client";

import clsx from "clsx";
import { addMonths, eachDayOfInterval, endOfMonth, format, getDay, isSameDay, isToday, startOfMonth } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import ChangeMonthButton from "@/app/ui/properties/buttons";

// weekdays in Spanish
const WEEKDAYS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

interface Event {
    startDate: Date;
    endDate: Date;
    title: string;
}

interface EventCalendarProps {
    events?: Event[];
}

interface DayWithEvents {
    day: Date;
    title: string;
}

export default function PropertyCalendar({ events = [] }: EventCalendarProps) { 
    const [currentDate, setCurrentDate] = useState(new Date());
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(startOfMonth(currentDate));
    const [lastDayOfMonth, setLastDayOfMonth] = useState(endOfMonth(currentDate));
    const [startingDayIndex, setStartingDayIndex] = useState(getDay(firstDayOfMonth));

    // Create only one array of days with all the events
    const daysWithEvents = useMemo(() => {
        const daysWithEvents: DayWithEvents[] = [];
        events.forEach((event) => {
            const days = eachDayOfInterval({
                start: event.startDate,
                end: event.endDate
            });
            days.forEach((day) => {
                daysWithEvents.push({
                    day,
                    title: event.title
                });
            });
        });
        return daysWithEvents;
    }, [events]);

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
            <div className="grid grid-cols-2 gap-2 mb-5">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold">Calendario de la propiedad</h1>  
                </div>
                <div className="flex flex-col items-center">
                    <button className="bg-green-700 text-white rounded-md p-2 hover:bg-green-900 w-fit">
                        Agregar alquiler
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-5">
                <div />
                <div className="flex flex-col items-center">
                    <div onClick={() => handleButton("1")}>
                        <ChangeMonthButton text="Año anterior" />
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div onClick={() => handleButton("2")}>
                        <ChangeMonthButton text="Mes anterior" />
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="text-center">{format(currentDate, 'MMMM yyyy')}</h2>
                </div>
                <div className="flex flex-col items-center">
                    <div onClick={() => handleButton("3")}>
                        <ChangeMonthButton text="Mes siguiente" />
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div onClick={() => handleButton("4")}>
                        <ChangeMonthButton text="Año siguiente" />
                    </div>
                </div> 
            </div>
            <div className="grid grid-cols-7 gap-2">
                {WEEKDAYS.map((day) => (
                    <div key={day} className="text-center border-2 border-black font-bold">
                        {day}
                    </div>
                ))}
                {Array.from({ length: startingDayIndex }).map((_, index) => (
                    <div key={`empty-${index}`} className="text-center border-2 border-black rounded-md p-2 h-20" />
                ))}
                {daysInMonth.map((day, index) => {
                    const eventTitles = daysWithEvents
                        .filter((event) => isSameDay(event.day, day))
                        .map((event) => event.title);

                    return (
                        <div key={index} className={clsx(
                            "text-center border-2 border-black rounded-md p-2 h-20 hover:bg-black hover:text-white cursor-pointer", {
                                'bg-slate-700 text-white': isToday(day),
                            }
                        )}>
                            {format(day, 'd')}
                            {eventTitles.length > 0 && (
                                <div className="mt-2">
                                    {eventTitles.map((title, idx) => (
                                        <div key={idx} className="text-xs text-black bg-slate-400">
                                            {title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    ); 
}

