/* *
  title: RowSlot.js 

  date: 5/28/2019

  author:  javier olaya

  description: component that handles the main logic for accessing and organizing the 
         
 */
import React from 'react';
import DaySlot from './DaySlot';
import styles from '../css/styles.css';

/* define the state properties of the  */
const RowSlot = ({ days, numberSpace, endSpace }) => <div className={"calendarW"}>
  {
    numberSpace.map((elem, index) => <DaySlot key={index} >{""}</DaySlot>)
  }

  {Object.keys(days).map((day, index) => {
    if (days[day]) {
      return <DaySlot key={index} activities={days[day]} >{day}{day == index ? days[day]: null}</DaySlot>
    } else {
      return <DaySlot key={index}  >{day}</DaySlot>
    }

  })
  }

  {
    endSpace.map((elem, index) => <DaySlot key={index} >{""}</DaySlot>)
  }

</div>


export default RowSlot;