
/* *
  title: Modal.js 

  date: 5/28/2019

  author:  javier olaya

  description: the Maing component that handles the main logic for accessing and organizing the main functions of the calendar
         
 */
import React from 'react';
import FormInfo from './FormInfo';
import styles from '../css/styles.css';

/* define the state properties of the Modal */
const Modal = ({ toggleModal, handleUpdate, yearList, dayList, currentActivity }) => {
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