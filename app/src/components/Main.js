/* *
  title: Main.js 

  date: 5/28/2019

  author:  javier olaya

  description: the Maing component that handles the main logic for accessing and organizing the main functions of the calendar
         
 */
import React from 'react';
import EventList from './EventList';
import NavComponent from './NavComponent';
import Calendar from './Calendar';
import styles from '../css/styles.css';


/* define the state properties of the calendar */
export default class Main extends React.Component {
  /* define the state properties of the  */
  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      showModal: false,
      numbersDaysInCurrentMonth: new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(),
      currentDay: today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
      currentMonth: today.getMonth() + 1,
      currentYear: today.getFullYear(),
      highestYear: today.getFullYear() + 4,
      fixedDay: today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
      fixedMonth: today.getMonth() + 1,
      fixedYear: today.getFullYear(),
      years: {},
      monthConversion: { 1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December" },
      dayConversion: { 0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday" },
      currentActivity: null,
    }
  }

  /* 
 @description add event to the calendar

 @param Event

 */
  addEventId = (event) => {
    //
    const { name } = event.target;//id
    const today = new Date();
    const id = today;
    const { currentYear, currentMonth, years } = this.state;
    // check if any years exist if so update the years
    if (Object.keys(years).length >= 1) {
      let months = years[currentYear];
      //  check and months exist for this year
      if (months) {
        let time = months[currentMonth];
        // check and months exist for this year
        if (time) {
          time[id] = name;
          months[currentMonth] = time;
          years[currentYear] = months;
          let placeHolder = { years }
          this.setState((state, props) => (placeHolder))
        } else {
          // if no time exist add the current the activity
          months[currentMonth] = { [id]: name };
          years[currentYear] = months;
          let placeHolder = { years }
          this.setState((state, props) => (placeHolder))
        }
      } else {
        // if no months exists add the current month with the activity
        let month = { [currentMonth]: { [id]: name } };
        years[currentYear] = month;
        let placeHolder = { years };
        this.setState((state, props) => (placeHolder));
      }
    }
    else {
      // if no year exists add the currentYear with the current month and the activity
      let placeHolder = { years: { [currentYear]: { [currentMonth]: { [id]: name } } } }
      this.setState((state, props) => (placeHolder));
    }
  }

  /* 
 @description add event to the calendar

 @param string

 */
  addEvent = (id, name) => {
    const { years } = this.state;
    const currentYear = id.getFullYear();
    const currentMonth = id.getMonth() + 1;
    // check if any years exist if so update the years
    if (Object.keys(years).length >= 1) {
      let months = years[currentYear];
      //  check and months exist for this year
      if (months) {
        let time = months[currentMonth];
        // check and months exist for this year
        if (time) {
          time[id] = name;
          months[currentMonth] = time;
          years[currentYear] = months;
          let placeHolder = { years }
          this.setState((state, props) => (placeHolder))
        } else {
          // if no time exist add the current the activity
          months[currentMonth] = { [id]: name };
          years[currentYear] = months;
          let placeHolder = { years }
          this.setState((state, props) => (placeHolder))
        }
      } else {
        // if no months exists add the current month with the activity
        let month = { [currentMonth]: { [id]: name } };
        years[currentYear] = month;
        let placeHolder = { years };
        this.setState((state, props) => (placeHolder));
      }
    }
    else {
      // if no year exists add the currentYear with the current month and the activity
      let placeHolder = { years: { [currentYear]: { [currentMonth]: { [id]: name } } } }
      this.setState((state, props) => (placeHolder));
    }
  }
  /* 
 @description get the list of all events stored

 @param integer

 */
  viewHistoryOfEvents = (month = "initial") => {
    // this needs to be placed in the render method
    let years = this.state.years;

    return Object.keys(years).map(function (key, index) {
      return Object.keys(years[key]).map(function (ky, ind) {
        let months = years[key];
        return Object.keys(months[ky]).map(function (k, i) {
          let time = months[ky]
          let st = key + ": " + ky + ": " + k + ": " + time[k];
          return <div key={index + ind + i}>{st}</div>
        })
      })
    })

  }

  /* 
 @description update the event using a button

 @param event

 */
  updateExistingEvent = (e) => {
    const { id, value } = e.target;
    this.updateEvent(id, value);
  }

  /* 
 @description update existing event in the calendar 

 @param date, string, event

 */

  updateEvent = (id, name, newId) => {
    this.deleteEvent(id);
    this.addEvent(newId, name)
  }

  /* 
 @description delete an event

 @param date

 */
  deleteEvent = (id) => {
    let { currentYear, currentMonth, years } = this.state;
    // get current year month and id and change the name of the activity
    let yr = Object.keys(years).length;

    if (yr >= 1) {
      log("1");
      let months = years[currentYear];
      if (months) {
        let time = months[currentMonth];
        if (time) {
          delete time[id];
          if (Object.keys(time).length < 1) { months[currentMonth] = {}; } else { months[currentMonth] = time; }

          if (Object.keys(months[currentMonth]).length < 1) { years[currentYear] = {} } else { years[currentYear] = months; }

          if (Object.keys(years[currentYear]).length < 1) { years = {} } else { years[currentYear] = months; }

          this.setState({ years });
        } else {
          alert("cannot delete event because there is no time match with the selected time");
        }
      } else {
        alert("cannot delete event because there is no month matches with the selected month");
      }

    } else {
      alert("cannot delete event because there is no year that matches with the selected year");
    }
  }

  /* 
 @description increment month as stepper

 */
  incrementMonth = () => {

    let month = this.state.currentMonth + 1;
    if (month > 12) { month = 1; }
    let numDaysMonth = new Date(this.state.currentYear, month + 1, 0).getDate();
    this.setState((state, props) => ({ currentMonth: month, numbersDaysInCurrentMonth: numDaysMonth }))

  }

  /* 
 @description decrement Month as stepper

 */
  decrementMonth = () => {
    let month = this.state.currentMonth - 1;
    if (month < 1) { month = 12; }
    let numDaysMonth = new Date(this.state.currentYear, month + 1, 0).getDate();
    this.setState((state, props) => ({ currentMonth: month, numbersDaysInCurrentMonth: numDaysMonth }))
  }
   
  /* 
 @description decrement year

 */
  decrementYear = () => {
    let year = this.state.currentYear - 1;
    if (year < 1700) { year = this.state.highestYear; }
    this.setState((state, props) => ({ currentYear: year }))
  }


  /* 
 @description increment year

 */
  incrementYear = () => {
    let year = this.state.currentYear + 1;
    let hy = this.state.highestYear;
    if (year > hy) { year = hy; }
    this.setState((state, props) => ({ currentYear: year }))
  }

  /* 
 @description get a list of future events in the calendar

 */
  viewFutureEvents = () => {
    let { years, fixedYear, fixedMonth, fixedDay, monthConversion } = this.state;
    let futureEvents = [];

    Object.keys(years).map(function (key, index) {
      if (key >= fixedYear) {
        Object.keys(years[key]).map(function (ky, ind) {
          let months = years[key];
          Object.keys(months[ky]).map(function (k, i) {
            let time = months[ky]
            let currentDate = new Date();
            let kDate = new Date(k);
            kDate.setHours(0, 0, 0, 0);
            currentDate.setHours(0, 0, 0, 0);

            if (kDate >= currentDate) {
              let st = key + ":: " + monthConversion[ky] + ":: " + k + ":: " + time[k];
              futureEvents.push(st);
            }

          })
        })
      }
    })
    return futureEvents;
  }

  /* 
  @description a toggle to hide or show the modal


  */
  toggleModal = () => {
    this.setState((state, props) => ({ showModal: !this.state.showModal }));
  }

  /* 
  @description a toggle to hide or show the modal

  @param event 

  */
  toggleModalId = (e) => {
    let id = e.target.id;
    this.setState((state, props) => ({ showModal: !this.state.showModal, currentActivity: id }));
  }

  /* 
  @description creating an event on a calendar

  @param date, string, integer, integer, integer, integer, integer

  */
  handleActivityCreation = (id, _name, _year, _month, _day, _hour, _minute) => {
    let date = this.handleSubmit(id, _name, _year, _month, _day, _hour, _minute);
    this.addEvent(date, _name)
  }

  /* 
  @description modifies the event's name and time

  @param date, string, integer, integer, integer, integer, integer

  */
  handleUpdate = (id, _name, _year, _month, _day, _hour, _minute) => {
    let date = this.handleSubmit(id, _name, _year, _month, _day, _hour, _minute);
    this.updateEvent(id, _name, date);
  }

  /* 
  @description create a date based on the form submission

  @param date, string, integer, integer, integer, integer, integer

  */
  handleSubmit = (id, _name, _year, _month, _day, _hour, _minute) => {
    let date = new Date(id);
    date.setFullYear(_year);
    date.setMonth(_month - 1);
    date.setDate(_day);
    date.setHours(_hour);
    date.setMinutes(_minute);
    return date
  }

  /* 
  @description gets a list of years for the form

  @return array

  */
  yearList = () => {
    let stack = [];
    let hy = this.state.highestYear;
    for (let indx = 1170; indx < hy; indx += 1) {
      stack.push(indx);
    }
    return stack.reverse();

  }

  /* 
  @description gets a list of years for the form

  @return array

  */
  dayList = () => {
    let days = new Date(this.state.currentYear, this.state.currentMonth, 0).getDate();
    let stack = [];
    for (let indx = 1; indx <= days; indx += 1) {
      stack.push(indx);
    }
    return stack;
  }

  /* 
  @description searches for the activity to be updated

  @param date

  @return object

  */
  getCurrentActivity = (dateString) => {
    if (!dateString) return { name: "", year: "", month: "", hour: "", minute: "" };
    let { currentYear, currentMonth, years } = this.state;
    // let currentActivity = new Date(dateString).set;
    // get current year month and id and change the name of the activity
    let result = { name: "", year: "", month: "", hour: "", minute: "" };
    Object.keys(years).map((year, index) => {
      let months = years[year];
      return Object.keys(months).map((month, indx) => {
        let time = months[month];
        return Object.keys(time).map((id, inx) => {
          if (id.trim == dateString.trim) {
            let da = new Date(dateString);
            result = {
              id: id, name: time[id], year: year, month: month,
              hour: da.getHours(), minute: da.getMinutes()
            }
          }
        });
      });
    });
    return result;
  }

  /* 
    @description create a list of number for the month, and space before and after the numbers on the calendar
  
    @return object
  
    */
  createWeekDays = () => {
    let { dayConversion, currentYear, currentMonth } = this.state;
    let t = new Date(this.state.currentYear, this.state.currentMonth, 0);
    let fixedDay = t.getDate();
    let days = new Date(this.state.currentYear, this.state.currentMonth, 0).getDate();

    let daysActivities = this.getMonthsActivies();
    let startDay = false;
    let weekDay = [];
    let week = [];
    let negativeNumbers = [];
    let postive = [];
    let counter = 1;
    let weektracker = 1;
    let neg = 0;
    let checkNeg = true;
    let limit = days / 7;
    if (days % 7 >= 1) limit++;
    // get the list of activities for that month
    // get the day list
    // get the cache of days indexed with day string 
    // create a var switch as false
    // create 2 stacks one for outer rows and the inner for days in that row
    // while loop until counter is >= days.length;
    while (weektracker <= limit) {

      // have inner for loop through the days of the week
      let obj = {};

      for (let indx = 0; indx <= 6; indx += 1) {
        if (counter - 1 >= fixedDay) postive.push("_");
        // inside of the for loop, 
        // if the startday is true then push an object {counter: list of activies}(check if is in the list of activies for that day) to the inner stack
        // if the current index matches the dates name of the day 

        if (startDay) {
          if (counter - 1 < fixedDay) {
            obj[counter] = daysActivities[counter] ? daysActivities[counter] : null
            // week.push(obj);
          }
          // increment the counter
          counter++;
        } else {
          let firstDay = new Date(currentYear, currentMonth - 1, 1);
          if (dayConversion[indx] === dayConversion[firstDay.getDay()]) {
            //then set the switch var into true and then push an object {counter: list of activies} to the inner stack
            // increment the counter
            startDay = true;

            obj[counter] = daysActivities[counter] ? daysActivities[counter] : null
            // week.push(obj);
            counter++;
          } else {
            neg--;
            negativeNumbers.push(neg);
            // obj[neg] = daysActivities[counter] ? daysActivities[counter] : null
          }

        }
      }
      if (checkNeg) {
        days = days + Math.abs(neg);
        limit = days / 7;
        if (days % 7 >= 1) limit++;
        checkNeg = false;
      }
      week.push(obj);
      // push the inner stack into the outter stack
      weekDay.push(week);
      weektracker++;

      // empty the inner stack
      week = [];

    }

    let returnObj = [];
    returnObj.push(weekDay);
    returnObj.push(negativeNumbers);
    returnObj.push(postive);
    return returnObj;
  }

  /* 
  @description get all the activities that have been schedule for the month

  @return object

  */
  getMonthsActivies = () => {
    // get the list of all the activites by the current month and year
    let { years, currentYear, currentMonth, } = this.state;
    let result = {};
    let event = {};
    if (Object.keys(years).length === 0) return {};
    let months = years[currentYear];
    if (typeof months === "undefined") return {};
    let times = months[currentMonth];
    if (typeof times === "undefined") return {};

    // loop through every day in the month  
    Object.keys(times).map((time) => {
      let activity = times[time];
      // that month and the activities and store into an object
      let da = new Date(time);
      let day = da.getDay();
      let numberOfDayInMonth = da.getDate();
      //get the number of the 
      if (!event[day]) {
        let actArray = [];
        actArray.push(activity);
        event[day] = actArray;
        result[numberOfDayInMonth] = event;
      } else {
        event[day].push(activity);
        let temp = result[numberOfDayInMonth];
        temp = event;
      }
    });
    // return and  obj {numberOfTheDay: [activities]}
    return result;
  }

  render() {
    const { incrementMonth, decrementMonth, decrementYear,
      incrementYear, toggleModalId, toggleModal, handleUpdate, handleActivityCreation,
      yearList, dayList, viewFutureEvents, getCurrentActivity, deleteEvent, createWeekDays } = this;
    const { showModal, currentActivity, currentYear, currentMonth, monthConversion } = this.state;
    const sta = this.viewHistoryOfEvents();
    return (
      <div >

        {(<div >
          <div className={"row"}>
            <div className={"column"}>
              <NavComponent
                decrementYear={decrementYear}
                incrementYear={incrementYear}
                decrementMonth={decrementMonth}
                incrementMonth={incrementMonth}
                yearList={yearList()} dayList={dayList()}
                currentActivity={getCurrentActivity(currentActivity)}
                handleActivityCreation={handleActivityCreation}
                toggleModal={toggleModal}
                currentYear={currentYear}
                currentMonth={currentMonth}
              ></NavComponent>

            </div>
          </div>
          <div className={"row"}>
            <div className={"rowEvent"}>
              <EventList yearList={yearList()} dayList={dayList()}
                currentActivity={getCurrentActivity(currentActivity)}
                handleUpdate={handleUpdate}
                toggleModal={toggleModal} showModal={showModal}
                viewFutureEvents={viewFutureEvents()} toggleModalId={toggleModalId}
                showModal={showModal} deleteEvent={deleteEvent}>
              </EventList>
            </div>
            <div className={"columnCalendar"}>
              <Calendar createWeekDays={createWeekDays()} dayList={dayList()} decrementYear={decrementYear} incrementYear={incrementYear} decrementMonth={decrementMonth}
                incrementMonth={incrementMonth} currentYear={currentYear} currentMonth={monthConversion[currentMonth]}></Calendar>
            </div>
          </div>
        </div>)
        }
      </div>
    );
  }
}
