/* *
  title: DaysRow.js 

  date: 5/28/2019

  author:  javier olaya

  description: component that handles the main logic for accessing and organizing the days of the week as a title 
         
 */

import React from 'react';
import DaySlot from './DaySlot';
import styles from '../css/styles.css';

/* define the state properties of the  */
const DaysRow = () => <div className={"calendarW"}>
  <DaySlot><div className={"daysRow"}>S</div></DaySlot>
  <DaySlot><div className={"daysRow"}>M</div></DaySlot>
  <DaySlot><div className={"daysRow"}>T</div></DaySlot>
  <DaySlot><div className={"daysRow"}>W</div></DaySlot>
  <DaySlot><div className={"daysRow"}>TH</div></DaySlot>
  <DaySlot><div className={"daysRow"}>F</div></DaySlot>
  <DaySlot><div className={"daysRow"}>S</div></DaySlot>
</div>;

export default DaysRow;