/* *
  title: NavComponent.js 

  date: 5/28/2019

  author: javier olaya

  description: component that handles the main logic for accessing and organizing the 
         
 */
import React from 'react';
import FormInfo from './FormInfo'

/* define the state properties of the  */
const NavComponent = ({ handleActivityCreation, yearList, dayList,
  currentActivity, currentYear, currentMonth }) => <div>

    <FormInfo
      currentActivity={currentActivity}
      yearList={yearList}
      dayList={dayList}
      toggleModal={f => f}
      cb={handleActivityCreation}
      showCancel={false}
      currentYear={currentYear}
      currentMonth={currentMonth}
    ></FormInfo>
  </div>;

export default NavComponent;