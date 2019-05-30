import React from 'react';
import DaySlot from './DaySlot';

import styles from '../css/styles.css';

const RowSlot = ({ days, numberSpace, endSpace }) =><div className={"calendarW"}>
    {
      numberSpace.map((elem, index)=><DaySlot key={index} >{""}</DaySlot>)
    }

    {Object.keys(days).map((day, index) => {
      if (days[day]) {
        return <DaySlot key={index} activities={days[day]} >{day}</DaySlot>
      } else {
        return <DaySlot key={index}  >{day}</DaySlot>
      }

    })
    }

{
  endSpace.map((elem, index)=><DaySlot key={index} >{""}</DaySlot>)
    }

  </div>


export default RowSlot;