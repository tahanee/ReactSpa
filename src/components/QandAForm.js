import React, { Component } from 'react';
import { myConfig } from './config.js';
export class QandAForm extends Component 
{
  displayName = QandAForm.name
  baseURL = myConfig.apiUrl;
  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };  
  }
  postData()
  {
    
    var url = this.baseURL+"/Api/Values/Item";
    fetch(url, {
      method : "POST",
      headers: {
              "Content-Type": "application/json; charset=utf-8",
               },
      body : JSON.stringify({
          Id : document.getElementById('id').value,
          ques : document.getElementById('ques').value,
          ans : document.getElementById('ans').value
          
      })
  })
  .then(function(response)
  {
      response => response.json()
  }).then(function(text)
  {
      //LoadPosts_FetchAPI();    
  });

  }

  render() 
  {
    return (
      <div>
       <form>
       <label>
    Id:
    <input type="text" name="id" id="id"/>
  </label>
  <label>
    Question:
    <input type="text" name="ques" id="ques"/>
  </label>
  <label>
      Answer:
  <input type="text" name="ans" id="ans" />
  </label>
</form>
      </div>
    );
  }
}
