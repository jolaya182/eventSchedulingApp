/* *
  title: Main.js 

  date: 5/21/2019

  author:  javier olaya

  description: component that handles the main logic for accessing and organizing the calendar
         
 */
import React from 'react';
import EventList from './EventList';
import NavComponent from './NavComponent';
import Calendar from './Calendar';
import styles from '../css/styles.css';


/* define the state properties of the calendar */
export default class Main extends React.Component {
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
  @description method tha updates  
  and current state of the buttons 

  @param props

  */

  componentDidUpdate() {
    console.log("years", this.state.years);
    // console.log("number of days:", this.state.numbersDaysInCurrentMonth)
  }

  //add event to the calendar
  addEventId = (event) => {
    //
    const { name } = event.target;//id
    const today = new Date();
    const id = today;
    // console.log(id, name, value);
    const { currentYear, currentMonth, years } = this.state;
    // check if any years exist if so update the years
    if (Object.keys(years).length >= 1) {
      let months = years[currentYear];
      // console.log("months", months);
      //  check and months exist for this year
      if (months) {
        let time = months[currentMonth];
        // console.log("time", time);
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
          // console.log("added the event", placeHolder);
          this.setState((state, props) => (placeHolder))
        }
      } else {
        // if no months exists add the current month with the activity
        let month = { [currentMonth]: { [id]: name } };
        years[currentYear] = month;
        let placeHolder = { years };
        // console.log("added the event", placeHolder);
        this.setState((state, props) => (placeHolder));
      }
    }
    else {
      // if no year exists add the currentYear with the current month and the activity
      let placeHolder = { years: { [currentYear]: { [currentMonth]: { [id]: name } } } }
      // console.log("added the event", placeHolder);
      this.setState((state, props) => (placeHolder));
    }
  }

  addEvent = (id, name) => {
    //
    console.log("addEvent:",id, name);
    const { years } = this.state;
    const currentYear = id.getFullYear();
    const currentMonth = id.getMonth()+1 ;
    console.log("currentYear-:", currentYear, "currentMonth", currentMonth);
    // check if any years exist if so update the years
    if (Object.keys(years).length >= 1) {
      let months = years[currentYear];
      console.log("month-", months);
      //  check and months exist for this year
      if (months) {
        let time = months[currentMonth];
        console.log("time-", time);
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
          // console.log("added the event", placeHolder);
          this.setState((state, props) => (placeHolder))
        }
      } else {
        // if no months exists add the current month with the activity
        let month = { [currentMonth]: { [id]: name } };
        years[currentYear] = month;
        let placeHolder = { years };
        // console.log("added the event", placeHolder);
        this.setState((state, props) => (placeHolder));
      }
    }
    else {
      // if no year exists add the currentYear with the current month and the activity
      let placeHolder = { years: { [currentYear]: { [currentMonth]: { [id]: name } } } }
      console.log("added the event", placeHolder);
      this.setState((state, props) => (placeHolder));
    }
  }
  //view coming events
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
  updateExistingEvent = (e) => {
    const { id, value } = e.target;
    this.updateEvent(id, value);
  }

  // update existing event in the calendar
  updateEvent = (id, name, newId) => {
    let { currentYear, currentMonth, years } = this.state;

    this.deleteEvent(id);
    this.addEvent(newId, name)

  }

  // delete an event
  deleteEvent = (id) => {
    let { currentYear, currentMonth, years } = this.state;
    // get current year month and id and change the name of the activity
    let yr = Object.keys(years).length;

    if (yr >= 1) {
      console.log("1");
      let months = years[currentYear];
      if (months) {
        console.log("2");
        let time = months[currentMonth];
        if (time) {
          console.log("3");
          console.log("time:", time, "id:", id, "time[id]:", time[id]);
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

  //increment month
  incrementMonth = () => {

    let month = this.state.currentMonth + 1;
    if (month > 12) { month = 1; }
    let numDaysMonth = new Date(this.state.currentYear, month + 1, 0).getDate();
    this.setState((state, props) => ({ currentMonth: month, numbersDaysInCurrentMonth: numDaysMonth }))

  }
  //decrementMonth
  decrementMonth = () => {
    let month = this.state.currentMonth - 1;
    if (month < 1) { month = 12; }
    let numDaysMonth = new Date(this.state.currentYear, month + 1, 0).getDate();
    this.setState((state, props) => ({ currentMonth: month, numbersDaysInCurrentMonth: numDaysMonth }))
  }
  // decrement year
  decrementYear = () => {
    let year = this.state.currentYear - 1;
    if (year < 1700) { year = this.state.highestYear; }
    this.setState((state, props) => ({ currentYear: year }))
  }

  // increment year
  incrementYear = () => {
    let year = this.state.currentYear + 1;
    let hy = this.state.highestYear;
    if (year > hy) { year = hy; }
    this.setState((state, props) => ({ currentYear: year }))
  }

  viewFutureEvents = () => {
    let { years, fixedYear, fixedMonth, fixedDay, monthConversion } = this.state;
    let futureEvents = [];

    Object.keys(years).map(function (key, index) {
      // console.log("1");
      if (key >= fixedYear) {
        Object.keys(years[key]).map(function (ky, ind) {
          // console.log("2");
          let months = years[key];
          Object.keys(months[ky]).map(function (k, i) {
            // console.log("3");
            let time = months[ky]
            let currentDate = new Date();
            let kDate = new Date(k);
            kDate.setHours(0, 0, 0, 0);
            currentDate.setHours(0, 0, 0, 0);
            // console.log(kDate.setHours(0,0,0,0) >= currentDate.setHours(0,0,0,0));

            if (kDate >= currentDate) {
              let st = key + ":: " + monthConversion[ky] + ":: " + k + ":: " + time[k];
              futureEvents.push(st);
            }

          })
        })
      }
    })
    console.log("futureEvents", futureEvents);
    return futureEvents;
  }

  toggleModal = () => {
    this.setState((state, props) => ({ showModal: !this.state.showModal }));
  }

  toggleModalId = (e) => {
    // console.log('id',id);
    let id = e.target.id;
    this.setState((state, props) => ({ showModal: !this.state.showModal, currentActivity: id }));
  }
  handleActivityCreation = (id, _name, _year, _month, _day, _hour, _minute) => {
    let date = this.handleSubmit(id, _name, _year, _month, _day, _hour, _minute);
    this.addEvent(date, _name)
  }

  handleUpdate = (id, _name, _year, _month, _day, _hour, _minute) => {
    let date = this.handleSubmit(id, _name, _year, _month, _day, _hour, _minute);
    this.updateEvent(id, _name, date);
  }

  handleSubmit = (id, _name, _year, _month, _day, _hour, _minute) => {
    // let {_name, _name, _name, _name, _name} = e;
    console.log("handling submit");
    console.log(id, _name, _year, _month-1, _day, _hour, _minute);
    let date = new Date(id);
    date.setFullYear(_year);
    date.setMonth(_month-1);
    date.setDate(_day);
    date.setHours(_hour);
    date.setMinutes(_minute);
    return date
  }

  yearList = () => {
    let stack = [];
    let hy = this.state.highestYear;
    for (let indx = 1170; indx < hy; indx += 1) {
      stack.push(indx);
    }
    return stack.reverse();

  }

  dayList = () => {
    let days = new Date(this.state.currentYear, this.state.currentMonth , 0).getDate();
    let stack = [];
    for (let indx = 1; indx <= days; indx += 1) {
      stack.push(indx);
    }
    return stack;
  }
  getCurrentActivity = (dateString) => {
    if (!dateString) return { name: "", year: "", month: "", hour: "", minute: "" };
    let { currentYear, currentMonth, years } = this.state;
    // let currentActivity = new Date(dateString).set;
    // get current year month and id and change the name of the activity
    let result = { name: "", year: "", month: "", hour: "", minute: "" };
    Object.keys(years).map((year, index) => {
      let months = years[year];
      // console.log("1");
      return Object.keys(months).map((month, indx) => {
        let time = months[month];
        // console.log("2");
        return Object.keys(time).map((id, inx) => {
          // console.log("3");
          // console.log("id:",id, "dateString:",dateString);
          if (id.trim == dateString.trim) {
            // console.log("4");
            let da = new Date(dateString);
            result = {
              id: id, name: time[id], year: year, month: month,
              hour: da.getHours(), minute: da.getMinutes()
            }
          }
        });
      });
    });
    console.log("result", result);
    return result;
  }

  createWeekDays = () => {
    let { dayConversion, currentYear, currentMonth } = this.state;
    let t = new Date(this.state.currentYear, this.state.currentMonth , 0);
    let fixedDay = t.getDate();
    console.log("Month date:", t);
    let days = new Date(this.state.currentYear, this.state.currentMonth , 0).getDate();

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
    console.log("days", days);
    let limit = days / 7;
    console.log("limit", limit);
    if (days % 7 >= 1)limit++;
    console.log("limit", limit);
    console.log("daysActivities", daysActivities);
    // if (Object.keysdays(Activities).length === 0) return [];
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
        if(counter-1>=fixedDay)postive.push("_");
        // inside of the for loop, 
        // if the startday is true then push an object {counter: list of activies}(check if is in the list of activies for that day) to the inner stack
        // if the current index matches the dates name of the day 

        if (startDay) {
          if(counter-1 < fixedDay){
          obj[counter] = daysActivities[counter] ? daysActivities[counter] : null
          // week.push(obj);
           }
          // increment the counter
          counter++;
        } else {
          let firstDay = new Date(currentYear, currentMonth - 1, 1);
          console.log("firstDay:", firstDay);
          console.log("dayConversion[indx]:", dayConversion[indx], " dayConversion[firstDay.getDay()]", dayConversion[firstDay.getDay()], "dayConversion[indx] ===  dayConversion[firstDay.getDay()]:", dayConversion[indx] === dayConversion[firstDay.getDay()])
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
      if(checkNeg){
        days = days + Math.abs(neg);
        limit = days / 7;
        console.log("neg limit", limit);
        if (days % 7 >= 1)limit++;
        checkNeg = false;
      }
      week.push(obj);
      console.log("postive", postive)
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
    console.log("returnObj", returnObj);
    return returnObj;
  }

  getMonthsActivies = () => {
    // get the list of all the activites by the current month and year
    let { years, currentYear, currentMonth, } = this.state;
    let result = {};
    let event = {};
    if (Object.keys(years).length === 0) return {};
    console.log(years);
    let months = years[currentYear];
    if (typeof months  === "undefined") return {};
    console.log("months", months)
    let times = months[currentMonth];
    if (typeof times  === "undefined") return {};

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
