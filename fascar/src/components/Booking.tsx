import React from 'react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { DayPicker } from 'react-day-picker'
import "react-day-picker/dist/style.css"
import { addDays } from 'date-fns'

export function Booking({ getDates }) {
    const initialRange: DateRange = {
        from: addDays(new Date(), 1),
        to: addDays(new Date(), 2)
    }
    const today = new Date()
    today.setDate(today.getDate() + 1)


    const [range, setRange] = useState<DateRange | undefined>(initialRange);
    
    //fix so that you can show the selected range / extract for database
    if(range){
        getDates(range)
    }
    
    return (
        <>
            <DayPicker className='calendar' defaultMonth={new Date()} mode='range' selected={range} onSelect={setRange} disabled={{before: today}}/>
        </>
    )
}
