import React from 'react';
import FormInfo from './FormInfo';
import styles from '../css/styles.css';

const Modal = ({toggleModal, handleUpdate,yearList, dayList, currentActivity}) => {
    // console.log("currentActivity",currentActivity);
    return (<div className="overLay">
          <FormInfo 
      currentActivity={currentActivity}
      yearList={yearList}
      dayList={dayList}
      toggleModal={toggleModal}
      cb={handleUpdate}
      showCancel={true}  
      ></FormInfo>
    </div>);

}
export default Modal;