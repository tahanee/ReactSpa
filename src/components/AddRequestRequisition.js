import React, { Component } from 'react';
import './NavMenu.css';
import { myConfig } from './config.js';
export class AddRequestRequisition extends Component 
{ 
  baseURL = myConfig.apiUrl;
    constructor (props) {
        super(props)
        this.state = 
        {          
          optionsdata : [
            {key:'1',value:'1'},
            {key:'2',value:'2'},
            {key:'3',value:'3'},
            {key:'4',value:'4'},
            {key:'5',value:'5'}
          ]
          };
    this.handleChange = this.handleChange.bind(this); 
    }

  handleChange = (e) => 
  {   
    var value = this.state.optionsdata.filter(function(item) {
      return item.key == e.target.value
    })    
  }
      
  render() 
  { 
    return(
    <div>       
    <form id ="form1" className="form-vertical" encType="multipart/form-data">
    <fieldset> 
    <legend>Request Requisition </legend> 
    <div className="form-group">
    <label>
      Title
    <input  className="form-control" type="text" id ="title_id" ref = "title_ref" />
    </label> </div>
    <div className="form-group">
    <label>
      Job Description
      <textarea class="form-control rounded-0" id="jobdescription_id" rows="3" ref = "jobdescription_ref"></textarea>    
     </label> 
    </div>
    <div className="form-group">
    <label>
      Email
      <input type="text" className="form-control" id ="email_id" ref = "hiringManagerEmail_ref"/>
    </label> 
    </div>
    <div className="form-group">
    <label>
      Notes
      <input type="text" className="form-control" id ="notes_id" ref = "notes_ref"/>
    </label> 
    </div>
    <div className="form-group">
    <label>
      Select Skills 
      <input type="text" className="form-control" id ="skills_id" ref = "skills_ref"/> 
   </label> 
    </div>    
    <div className="form-group">
    <label>
     Stages  
    <select id="stage_id" ref = "stage_ref"  onChange={this.handleChange}>
        {this.state.optionsdata.map(function(data, key){  return (
          <option key={key} value={data.key}>{data.value}</option> )
        })}
      </select>
    </label> 
    </div>
    <div className="form-group">
    <label>
     Planned DeadLine
      <input type="date"  className="form-control" id ="plan_id" ref = "plannedDate_ref"/>            
    </label> 
    </div>
    <div className="form-group">
    <input  id="btn-size" className="btn btn-primary" type="button" value="Submit"  onClick={() => this.postRequestRequisition()}/>  
    <input  id="btn-size" className="btn btn-primary" type="button" value="Update" onClick={() => this.updateRequestRequisition(this.props.dataeditRequestRequisition.id)}/>  
    <input  id="btn-size" className="btn btn-success" type="button" value="Clear" onClick={this.Clear} />   
    <div>     
    </div>    
    </div>
    </fieldset> 
    </form>  
    </div>
   );    
  }
  Clear()
  {
    document.getElementById('form1').reset();   
  }
  
  componentDidUpdate()
  {  
    this.refs.title_ref.value = this.props.dataeditRequestRequisition == null? "": this.props.dataeditRequestRequisition.title;
    this.refs.jobdescription_ref.value = this.props.dataeditRequestRequisition == null? "": this.props.dataeditRequestRequisition.description;   
    this.refs.hiringManagerEmail_ref.value = this.props.dataeditRequestRequisition == null? "": this.props.dataeditRequestRequisition.hiringManagerEmail;
    this.refs.notes_ref.value = this.props.dataeditRequestRequisition == null? "": this.props.dataeditRequestRequisition.notes;
    this.refs.skills_ref.value = this.props.dataeditRequestRequisition == null? "": this.props.dataeditRequestRequisition.skills;
    this.refs.stage_ref.value = this.props.dataeditRequestRequisition == null? "": this.props.dataeditRequestRequisition.stages;
    this.refs.plannedDate_ref.value = this.props.dataeditRequestRequisition == null? "": this.props.dataeditRequestRequisition.plannedDeadline;    
  }
  postRequestRequisition()
  {
    var  description = document.getElementById('jobdescription_id').value;
    const date = document.getElementById("plan_id").value;  
   
    var url = this.baseURL+"Api/ResourceRequisition/addResourceRequisition";
      fetch(url, {
        method : "POST",
        headers: {
                "Content-Type": "application/json; charset=utf-8",
                 },
        body : JSON.stringify({   
        Title : document.getElementById('title_id').value, 
         Description : document.getElementById('jobdescription_id').value,
         HiringManagerEmail : document.getElementById('email_id').value, 
         Notes : document.getElementById('notes_id').value,
         Skills : document.getElementById('skills_id').value, 
         Stages : document.getElementById('stage_id').value,
         PlannedDeadline : document.getElementById('plan_id').value      
       })
    })
    .then(function(response)
    {
        response => response.json()
        console.log(response);

    }).then((text) =>
    {    
      this.Clear();      
    }) 
   this.props.callPageRefresh();     
  }

  updateRequestRequisition(id)
  {
      var url = this.baseURL+"api/ResourceRequisition/"+ id;
      fetch(url, {
        method : "PUT",
        headers: {
                "Content-Type": "application/json; charset=utf-8",
                 },
         body : JSON.stringify({          
         title : document.getElementById('title_id').value, 
         description : document.getElementById('jobdescription_id').value,
         hiringManagerEmail : document.getElementById('email_id').value, 
         notes : document.getElementById('notes_id').value,
         skills : document.getElementById('skills_id').value, 
         stages : document.getElementById('stage_id').value,
         plannedDeadline : document.getElementById('plan_id').value          
          })
    
    })
    .then(function(response)
    {
        response => response.json();
        console.log(response);
    }).then((text) =>
    {
      this.Clear();
      this.props.callPageRefresh();  
    })    
  }  
}

