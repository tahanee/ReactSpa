import React, { PureComponent } from 'react';
import './NavMenu.css';
import Moment from 'react-moment';
import { myConfig } from './config.js';
export class RequestRequisitionList extends PureComponent 
{
  baseURL = myConfig.apiUrl;
  constructor (props) {
    super(props)
    this.state =    
    {
      requestRequisitionList: []         
    }; 
    this.fetchData();      
  }

  componentWillReceiveProps()
  {  
    this.fetchData();
    this.render();   
  }

  fetchData = () =>
  { 
   fetch(this.baseURL+'api/ResourceRequisition/ResourceRequisitionData')
     .then(response => response.json())
     .then(data => 
       {                 
      this.setState({requestRequisitionList : data}) 
      var val = data.map(value => value.id);    
       });
  } 

  editRequestRequisitionData(editData)
  {    
    this.props.getEditDataRequestRequisition(editData);    
  }

  delRequestRequisitionData(_id)
  {
    fetch(this.baseURL+'api/ResourceRequisition/'+_id , {method: 'delete'})
    .then(function(response){
        if(response.ok){
                return response.text();}
        })
    .then((text) =>
    {
        this.fetchData();
        this.render(this.state.requestRequisitionList);
    })  
    
  }

  render() 
  {
    return( 
      <table className="table table-hover">
        <thead>
          <tr>            
            <th>Title</th>
            <th>Description</th> 
            <th>Email</th> 
            <th>Notes</th> 
            <th>Skills</th> 
            <th>Stages</th> 
            <th>PlannedDeadline</th>            
          </tr>
        </thead>
        <tbody>
          { 
            this.state.requestRequisitionList.map(item =>
            <tr key={item.id}>              
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.hiringManagerEmail}</td>
              <td>{item.notes}</td>
              <td>{item.skills}</td>
              <td>{item.stages}</td>
              <Moment format="MM/DD/YYYY">
              {item.plannedDeadline}
              </Moment>
              {/* <td>{new Intl.DateTimeFormat('en-US').format(item.plannedDeadline)}</td> */}
              <td>
              <i className= "glyphicon glyphicon-edit" onClick={() => this.editRequestRequisitionData(item)} ></i>          
              <i className= "glyphicon glyphicon-trash" onClick={() => this.delRequestRequisitionData(item.id)}></i>                     
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );   
  }   
}