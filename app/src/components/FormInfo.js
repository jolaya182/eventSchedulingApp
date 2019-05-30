/* *
  title: FormInfo.js 

  date: 5/28/2019

  author:  javier olaya

  description: component that handles the main logic for accessing and organizing the form data entry
         
 */
import React from 'react';
import styles from '../css/styles.css';

export default class FormInfo extends React.Component {
   /* define the state properties of the  */
  constructor(props) {
    super(props)
    this.state = {
      yearList: props.yearList,
      dayList: props.dayList,
      currentActivity: props.currentActivity,
      showCancel: props.showCancel,
      currentYear:props.currentYear,
      currentMonth:props.currentMonth, 
    }
    this.cb = props.cb.bind(this);
    this.toggleModal = props.toggleModal.bind(this);
  }

   /* 
  @description event handler for the form submission

  @param Event 

  */
  submit = (e) => {
    e.preventDefault();
    // const {_name} = this.refs;
    const form = this.form;
    const _name = form[0]
    const _year = form[1];
    const _month = form[2];
    const _day = form[3];
    const _hour = form[4];
    const _minute = form[5];
    let error = "";
    if (_name.value == "Choose your name") error += _name.value + ", ";

    if (_year.value == "Choose your year") error += _year.value + ", ";

    if (_month.value == "Choose your Month") error += _month.value + ", ";

    if (_day.value == "Choose your day") error += _day.value + ", ";

    if (_hour.value == "Choose your hour") error += _hour.value + ", ";

    if (_minute.value == "Choose your minute") error += _minute.value;

    console.log("error", error);
    if (error == "") {
      let id = this.state.currentActivity;
      this.cb(id.id, _name.value, _year.value, _month.value, _day.value, _hour.value, _minute.value);
      this.toggleModal();
    } else {
      alert("cannot submit changes, please " + error);
    }

  }

  render() {
    const { toggleModal, submit } = this;
    const { yearList, dayList, currentActivity, showCancel, currentYear, currentMonth } = this.state;
    let hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    let minutes = [0, 15, 30, 45];
    let days = dayList;
    let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let years = yearList;
    return (<div >
      <h1>Create Event</h1>
      <form id="f" onChange={f => f} onSubmit={submit} ref={form => this.form = form} className="modal">
        <div className="row">
          <div className="column">
            Event Name:<label>{currentActivity.name}</label><input type="text" ref="_name" ></input>
          </div>

          <div className="column">
            Year date:<select type="text" ref="_year">
              <option>{"Choose your year"}</option>
              {years.map((elem, indx) => <option key={indx} >{elem}</option>)}
            </select>
          </div>
          <div className="column">
          Month date:<select type="text" ref="_month">
              <option>{"Choose your month"}</option>
              {months.map((elem, indx) => <option key={indx} >{elem}</option>)}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="column">
          Day Date:<select type="text" ref="_day">
              <option>Choose your day</option>
              {days.map((elem, indx) => <option key={indx} >{elem}</option>)}
            </select>
          </div>
          <div className="column">
            Hour:<select type="text" ref="_hour">
              <option>Choose your hour</option>
              {hours.map((elem, indx) =>
                <option key={indx} value={indx}>{indx + 1}</option>
              )}
            </select>
          </div>
          <div className="column">
            Minutes:<select type="text" ref="_minute">
              <option>Choose your minute</option>
              {minutes.map((elem, indx) =>
                <option key={indx} value={elem} >{elem}</option>
              )}
            </select>
          </div>

        </div>
        <div>
          <div className="row">
             <div className="column">
            
            {(showCancel )?<button onClick={toggleModal}>cancel</button>:null}
            
            <button type="submit">submit</button>
            </div>
          </div>      
        </div>
      </form>
    </div>);
  }
}