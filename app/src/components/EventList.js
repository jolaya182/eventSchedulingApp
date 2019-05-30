/* *
  title: EventList.js 

  date: 5/28/2019

  author:  javier olaya

  description: component that handles the main logic for accessing and organizing the future events 
         
 */
import React from 'react';
import Modal from './Modal'
import styles from '../css/styles.css';

export default class EventList extends React.Component {
  /* define the state properties of the  */
  constructor(props) {
    super(props)
    this.state = {
      viewFutureEvents: props.viewFutureEvents,
    }
    this.toggleModalId = props.toggleModalId.bind(this);
    this.deleteEvent = props.deleteEvent.bind(this);
  }

  /* 
 @description  will delete an event based on the event Id

 @param Event

 */
  deleteE = (e) => {
    let id = e.target.id;
    this.deleteEvent(id.trim());
  }

  render() {
    let { viewFutureEvents, showModal, dayList,
      currentActivity, yearList,
      handleUpdate,
      toggleModal } = this.props;
    let overlay = showModal ? "overlay" : ""
    return ((showModal) ? (<div className={"rowEvent"}><Modal yearList={yearList} dayList={dayList}
      currentActivity={currentActivity} handleUpdate={handleUpdate}
      toggleModal={toggleModal}></Modal>
    </div>) : <div className={overlay}>
        <h1>{"Up coming Events"}</h1>

        {viewFutureEvents.map((elem, indx) => {
          let s = elem.split("::");
          let date = new Date(s[2]);
          let day = date.getDate();
          return <div className="inL" key={indx}>
            <div className={"rightP"}>
              <label className={"deleteEvent"} id={s[2]} onClick={this.deleteE} >{"[X]"}</label>
            </div>
            <div className={"futureEvent"} id={s[2]} onClick={this.toggleModalId}>
              {s[0]}{s[1]}{day}{s[3]}
            </div>
          </div>
        })}
      </div>);
  }
}