/* *
  title: Calendar.js 

  date: 5/28/2019

  author:  javier olaya

  description: component that handles the main logic for accessing and organizing the Calendar 
         
 */
import React from 'react';
import RowSlot from './RowSlot';
import DaysRow from './DaysRow';
import styles from '../css/styles.css';

/* define the state properties of the calendar */
const Calendar = ({ createWeekDays, dayList, decrementYear, incrementYear, decrementMonth,
  incrementMonth, currentYear, currentMonth }) => <div>
    <div>
      <div>year: {currentYear}</div>
      <button onClick={decrementYear}>{"<"}</button>
      <button onClick={incrementYear}>{">"}</button>
    </div>
    <div>
      <div>month: {currentMonth}</div>
      <button onClick={decrementMonth}>{"<"}</button>
      <button onClick={incrementMonth}>{">"}</button>
    </div>
    <div>
      <DaysRow></DaysRow>
      {createWeekDays[0] ? createWeekDays[0].map((week, indx) => {
        return week.map((days) => <RowSlot endSpace={indx >= createWeekDays[0].length - 1 ? createWeekDays[2] : []}
          numberSpace={indx == 0 ? createWeekDays[1] : []} key={indx} days={days} ></RowSlot>)
      }) : null
      }
    </div>

  </div>;

export default Calendar;