import React, { PureComponent } from 'react';
import './NavMenu.css';
import { myConfig } from './config.js';
export class QandAList extends PureComponent 
{
  displayName = QandAList.name
  baseURL = myConfig.apiUrl;
  constructor(props)
   {
    super(props);
    this.state = { forecasts: [], loading: true };
    this.fetchData();
  }
    fetchData()
  {
  
   // alert("after refresh I am called");
    fetch(this.baseURL+'api/Values/TableData')
      .then(response => response.json())
      .then(data => {              
        this.setState({ forecasts: data, loading: false });
       var val = data.map(value => value.id);
       this.props.fetchData     
      });
  }

   renderForecastsTable(forecasts) {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Question</th>
            <th>Answer</th>            
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.id}>
              <td>{forecast.id}</td>
              <td>{forecast.ques}</td>
              <td>{forecast.ans}</td>
              <td>
              <input  id="btn-sizeList" type="button" className="btn btn-success" value ="Edit"   onClick={() => this.editData(forecast)}/>
              <input  id="btn-sizeList" type="button" className="btn btn-primary" value ="Delete" onClick={() => this.delData(forecast.id)}/>                
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
  editData(_id)
  {    
    this.props.CallBackHook(_id)
  }

  componentWillReceiveProps()
  { 
    this.fetchData();
    this.renderForecastsTable(this.state.forecasts);   
  }

  delData(_id)
  {      
    console.log(_id);
    fetch(this.baseURL+'/Api/Values/'+_id , {method: 'delete'})
    .then(function(response){
        if(response.ok){
                return response.text();}
        })
    .then((text) =>
    {
        this.fetchData();
        this.renderForecastsTable(this.state.forecasts);
    })  
        
  }

  render() 
  {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderForecastsTable(this.state.forecasts);

    return (
      <div>
      <div>
      {this.props.title}
      </div>
      <div>               
        {contents}
      </div>
      </div>      
    );
  }
}
