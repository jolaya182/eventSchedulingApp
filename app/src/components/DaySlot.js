import React from 'react';
import styles from '../css/styles.css';

const DaySlot = ({children, day, activities})=><div className={"calendarD"}>
{children}
{
 ( activities) ? <div>{day}{Object.keys(activities).
 map((d, index)=>{
   return <div key={index}className={"act"}>{ activities[d]}</div>
} )} </div>:null
  
}
</div>;

export default DaySlot; 