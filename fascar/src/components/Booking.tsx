import React from 'react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { DayPicker } from 'react-day-picker'
import "react-day-picker/dist/style.css"
import { addDays } from 'date-fns'

export function Booking() {
    const initialRange: DateRange = {
        from: new Date(),
        to: addDays(new Date(), 4)
    }
    
    const [range, setRange] = useState<DateRange | undefined>(initialRange);
    
    //fix so that you can show the selected range / extract for database
    let footer = <p>Pick a range</p>
    if(range){
        footer = <p>Selected range is</p>
    }
    const today = new Date()
    return <DayPicker defaultMonth={new Date()}mode='range' selected={range} onSelect={setRange} disabled={{before: today}}/>;
}
