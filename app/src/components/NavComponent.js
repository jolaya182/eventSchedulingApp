import React from 'react';
import FormInfo from './FormInfo'

const NavComponent = ({ handleActivityCreation,yearList, dayList, 
currentActivity, currentYear, currentMonth })=><div>

        <FormInfo 
      currentActivity={currentActivity}
      yearList={yearList}
      dayList={dayList}
      toggleModal={f=>f}
      cb={handleActivityCreation}
      showCancel={false}
      currentYear={currentYear}
      currentMonth={currentMonth} 
      ></FormInfo>
</div>;

export default NavComponent;