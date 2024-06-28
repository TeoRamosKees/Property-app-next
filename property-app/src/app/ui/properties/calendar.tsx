"use client";

import clsx from "clsx";
import { addMonths, eachDayOfInterval, endOfMonth, format, getDay, isSameDay, isToday, startOfMonth, addDays} from "date-fns";
import { useEffect, useMemo, useState } from "react";
import ChangeMonthButton from "@/app/ui/properties/buttons";
import Link from "next/link";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const WEEKDAYS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

export interface Event {
    start_date: Date;
    end_date: Date;
    title: string;
    color: string;
}

interface EventCalendarProps {
    events?: Event[];
    propertyId: string;
}

interface DayWithEvents {
    day: Date;
    title: string;
    color: string;
}

const PropertyCalendar = ({ events = [], propertyId }: EventCalendarProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(startOfMonth(currentDate));
    const [lastDayOfMonth, setLastDayOfMonth] = useState(endOfMonth(currentDate));
    const [startingDayIndex, setStartingDayIndex] = useState(getDay(firstDayOfMonth));

    const daysWithEvents = useMemo(() => {
        const daysWithEvents: DayWithEvents[] = [];
        events.forEach((event) => {
            const days = eachDayOfInterval({
                start: addDays(event.start_date, 1),
                end: addDays(event.end_date, 1)
            });
            days.forEach((day) => {
                daysWithEvents.push({
                    day,
                    title: event.title,
                    color: event.color
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

    const handleButton = (n: string) => {
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
            <div className="grid grid-cols-1 gap-2 mb-5">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-bold">Calendario de la propiedad</h1>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-5">
                <div className="flex flex-col items-center">
                    <Link
                        href={{
                            pathname: `/dashboard/properties/${propertyId}/calendar/addDate`,
                        }}
                        className="flex h-10 items-center rounded-lg bg-gray-600 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        <span className="hidden md:block">Agregar alquiler</span>{' '}
                        <PlusIcon className="h-5 md:ml-4" />
                    </Link>
                </div>
                <div className="flex flex-col items-center">
                    <Link
                        href={{
                            pathname: `/dashboard/properties/${propertyId}/calendar/deleteDate`,
                        }}
                        className="flex h-10 items-center rounded-lg bg-gray-600 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        <span className="hidden md:block">Cancelar alquiler</span>{' '}
                        <TrashIcon className="h-5 md:ml-4" />
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-5">
                <div />
                <div className="flex flex-col items-center">
                    <div onClick={() => handleButton("1")}>
                        <ChangeMonthButton text="<<" />
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div onClick={() => handleButton("2")}>
                        <ChangeMonthButton text="<" />
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="text-center">{format(currentDate, 'MMMM yyyy')}</h2>
                </div>
                <div className="flex flex-col items-center">
                    <div onClick={() => handleButton("3")}>
                        <ChangeMonthButton text=">" />
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div onClick={() => handleButton("4")}>
                        <ChangeMonthButton text=">>" />
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
                    const eventDetails = daysWithEvents
                        .filter((event) => isSameDay(event.day, day))
                        .map((event) => ({ title: event.title, color: event.color }));

                    return (
                        <div key={index} className={clsx(
                            "text-center border-2 border-black rounded-md p-2 h-20 hover:bg-black hover:text-white cursor-pointer", {
                                'bg-slate-700 text-white': isToday(day),
                            }
                        )}>
                            {format(day, 'd')}
                            {eventDetails.length > 0 && (
                                <div className="mt-2">
                                    {eventDetails.map((event, idx) => (
                                        <div key={idx} className={clsx(`text-xs text-black p-2 truncate hover:text-clip`, {
                                            'bg-red-500': event.color === 'red' ,
                                            'bg-green-500': event.color === 'green',
                                            'bg-yellow-500': event.color === 'yellow',
                                            'bg-blue-500': event.color === 'blue',
                                            'bg-violet-500': event.color === 'violet',
                                            'bg-pink-500': event.color === 'pink',
                                        }
                                    )}>
                                            {event.title}
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

export default PropertyCalendar;
