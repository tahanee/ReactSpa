import React, { Component } from 'react';
import './NavMenu.css';
import { myConfig } from './config.js';
export class Candidate extends Component {
    baseURL = myConfig.apiUrl;
    constructor(props) {
      super(props);
      this.state = {valueStages: '1',
      emaildata:'',
      emailError:false,
      optionsdata : [
        {key:'1',value:'1'},
        {key:'2',value:'2'},
        {key:'3',value:'3'},
        {key:'4',value:'4'},
        {key:'5',value:'5'}
      ]};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleStages = this.handleStages.bind(this);
    }
    validateEmail(emaill){
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const result = pattern.test(emaill);
        //alert('after me state wil be set');
        if(result===true || emaill===''){
          this.setState({
            emailError:false,
            emaildata:emaill
          })
        } else{
          this.setState({
            emailError:true,
            emaildata:emaill
          })
        }
      }
    handleChange=(e)=> 
    {
      if(e.target.name==='emailnm'){
      //alert(e.target.value);
      this.validateEmail(e.target.value);
    }
    }
    handleStages=(event)=>
    {
      var value = this.state.optionsdata.filter(function(item) {
        return item.value == event.target.value
      })  
  
    }
    clearData()
    {
      this.setState({valueStages:'1',emailError:false,
        emaildata:''});
    }
  
    handleSubmit(e) {
     // alert('Your favorite flavor is: ' + this.state.value);
      e.preventDefault();
      
    }
    twoFn(e)
    {
      this.handleSubmit(e);
      this.postJob();
    }
  
    render() {
      return (
        <form onSubmit={this.twoFn} id="form1" encType="multipart/form-data">
        <div className="form-group">
        <label >Job Requisition:
        <input type="text" id="txt_area" name="text" className="form-control" ref="jobReq" required/>
        </label>
        </div> 
        <div className="form-group">
          <label >Email:
          <input  id="emailid" name="emailnm" value={this.state.emaildata} className="form-control" placeholder="Enter your email" ref="emails" onChange={this.handleChange} />
          </label>
          {this.state.emailError ? <span style={{color: "red"}}>Please Enter valid email address</span> : ''}
        </div>
             
        <div className="form-group">
          <div id="stage" className="form-label-group">
          <label>
            Pick stages:
            <select id="select" ref = "stages"  onChange={this.handleStages}>
        {this.state.optionsdata.map(function(data, key){  return (
          <option key={key} value={data.key}>{data.value}</option> )
        })}
      </select>

          </label></div>
          <div id="date" className="form-label-group" >
          <label>Panel Deadline:
          <input type="date" id="day" name="date" className="form-control" ref="day" required/>
          </label>
          </div></div>
          <div className="form-group">
          <label>Resume Text:
          <textarea type="text" id="resume_text" name="text" rows="3" className="form-control" ref="rsmtext" /></label>
          </div>
          <div className="form-group">
            <label htmlFor="file">Resume upload:
            <input type="text" id="resume_file" name="file" className="form-control" ref="resume"/>
            </label>
          </div> 
          <div id="stage">
          {this.props.btnState?
          <input className="btn btn-primary" type="submit" onClick={(e) => this.twoFn(e)} value="Save" />:
          <input className="btn btn-primary" type="submit" onClick={(e) => this.updateData(this.props.selectedRecord.id)} value="Update" />
          }
          <input className="btn btn-primary" type="submit" onClick={() => this.Clear()} value="Clear" /></div>
          <div>
           {this.props.btnState? "": <input  id="btn-size" className="btn btn-primary" type="button" value="Back" onClick={() => this.twoFnHook()} /> }
        </div >
        </form>
      );
    }
    componentDidUpdate()
  {  
    this.refs.jobReq.value = this.props.selectedRecord == null? "": this.props.selectedRecord.resourceRequisition;
    this.refs.emails.value = this.props.selectedRecord == null? "": this.props.selectedRecord.candidateEmail;
    this.refs.stages.value = this.props.selectedRecord == null? "": this.props.selectedRecord.stages;
    this.refs.day.value = this.props.selectedRecord == null? "": this.props.selectedRecord.panelDeadline;
    this.refs.rsmtext.value = this.props.selectedRecord == null? "": this.props.selectedRecord.resumeText;
    this.refs.resume.value = this.props.selectedRecord == null? "": this.props.selectedRecord.resumeUpload;
    //alert("2 the fetchlist" + this.props.send2list);    
  }
    twoFnHook()
    {
      this.Clear();
      this.props.callBackHook2();
      
    }
    
    Clear()
     {
        document.getElementById('form1').reset();  
        this.clearData()

     }
     postJob()
  {
   
    var url = this.baseURL+"api/Candidate/addCandidates";
      fetch(url, {
        method : "POST",
        headers: {
                "Content-Type": "application/json; charset=utf-8",
                 },
        body : JSON.stringify({   
          ResourceRequisition : document.getElementById('txt_area').value, 
          CandidateEmail : document.getElementById('emailid').value,
          Stages : document.getElementById('select').value, 
          PanelDeadline : document.getElementById('day').value,
         ResumeText : document.getElementById('resume_text').value, 
         ResumeUpload : document.getElementById('resume_file').value 
            
        })
    })
    .then(function(response)
    {
        response => response.json()
        console.log(response);

    }).then((text) =>
    {    
      this.Clear();    
      this.props.refreshme();  
    })  
    
  }
  updateData(id)
  {
    //alert("Update called");
    console.log(id);
    var url = this.baseURL+"Api/Candidate/"+ id;
    fetch(url, {
      method : "PUT",
      headers: {
              "Content-Type": "application/json; charset=utf-8",
               },
      body : JSON.stringify({          
        resourceRequisition : document.getElementById('txt_area').value, 
        candidateEmail : document.getElementById('emailid').value,
        stages : document.getElementById('select').value, 
        panelDeadline : document.getElementById('day').value,
       resumeText : document.getElementById('resume_text').value, 
       resumeUpload : document.getElementById('resume_file').value         
        })
  
  })
  .then(function(response)
  {
      response => response.json();
      console.log(response);
  }).then((text) =>
  {   
    console.log(text);       
  }) 
  this.Clear();       
  this.props.callBackHook2();    
  }
  }
