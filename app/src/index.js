/* *
  title: index.js 

  date: 5/28/2019

  author:  javier olaya

  description: component that handles the main logic for accessing and organizing the 
         
 */
import React from 'react';
import ReactDom from 'react-dom';
import Main from './components/Main';

/* define the state properties of the  */
ReactDom.render((
  <div>
    <Main></Main>
  </div>
), document.getElementById("app"));