import React from 'react';
import styles from '../css/styles.css';

const DaySlot = ({children, day, activities})=><div className={"calendarD"}>
{children}
{
 ( activities) ? <div>{day}{Object.keys(activities).
 map((d, index)=>{
  //  console.log("dactivity:", activities[d]);
 return <div key={index} >
  {activities[d].map((activit, indx)=>{
    return <div key={indx}className={"act"}>{activit}</div>
  })}
 
 </div>} )} </div>:null
  
}
</div>;

export default DaySlot; 