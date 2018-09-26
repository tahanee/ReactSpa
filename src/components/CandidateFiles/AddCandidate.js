import React, { Component } from 'react';
import './NavMenu.css';
export class Candidate extends Component {
    constructor(props) {
      super(props);
      this.state = {value: '1',
      isDisabled:true};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    validateEmail(email){
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const result = pattern.test(email);
        if(result===true || email===''){
          this.setState({
            emailError:false,
            email:email
          })
        } else{
          this.setState({
            emailError:true
          })
        }
      }
    handleChange(e) {
        const target = e.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
  if(e.target.name==='email'){
    this.validateEmail(e.target.value);
   }
  this.setState({
    [name]: value,value: e.target.value
  });
      //this.setState({value: e.target.value});
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
                
                <label htmlFor="file">Job Requisition:
                  <input type="text" id="txt_area" name="text" className="form-control" required/>
                  </label>
               
              </div> 
        <div className="form-group">
                
                <label htmlFor="email">Email:
                  <input required id="email" name="email" className="form-control" placeholder="Enter your email" onChange={(e)=>{this.handleChange(e)}} />
                  </label>
                  {this.state.emailError ? <span style={{color: "red"}}>Please Enter valid email address</span> : ''}
                </div>
             
          <div className="form-group">
          <div id="stage" className="form-label-group">
          <label>
              
            Pick stages:
            <select id="select" value={this.state.value} onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </label></div>
          <div id="date" className="form-label-group">
          <label>Panel Deadline:
                  <input type="date" id="day" name="date" className="form-control" required/>
                  </label>
          </div></div>
          <div className="form-group">
          <label>Resume Text:
          <textarea type="text" id="resume_text" name="text" rows="3" className="form-control" /></label>
          </div>
          <div className="form-group">
                
                <label htmlFor="file">Resume upload:
                  <input type="file" id="resume_file" name="file" className="form-control" />
                  </label>
               
              </div> 
          <div id="stage">
          {this.props.btnState?
          <input className="btn btn-primary" type="submit" onClick={(e) => this.twoFn(e)} value="Save" />:
          <input className="btn btn-primary" type="submit" onClick={(e) => this.updateData(this.props.selectedRecord.id)} value="Update" />
          }
          <input className="btn btn-primary" type="submit" onClick={() => this. Clear()} value="Clear" /></div>
          <div>
           {this.props.btnState? "": <input  id="btn-size" className="btn btn-primary" type="button" value="Back" onClick={() => this.twoFn()} /> }
        </div >
        </form>
      );
    }
    twoFn()
    {
      this.props.callBackHook2();
      this.Clear();
    }
    
    Clear()
     {
        document.getElementById('form1').reset();   
     }
     postJob()
  {
    //alert("Job post is called"+ document.getElementById('day').value);
    var url = "https://localhost:5001/api/Candidate/addCandidates";
      fetch(url, {
        method : "POST",
        headers: {
                "Content-Type": "application/json; charset=utf-8",
                 },
        body : JSON.stringify({   
          ResourceRequisition : document.getElementById('txt_area').value, 
          CandidateEmail : document.getElementById('email').value,
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
    })  
    
  }
  updateData(id)
  {
    console.log(id);
    var url = "https://localhost:5001/Api/Candidate/"+ id;
    fetch(url, {
      method : "PUT",
      headers: {
              "Content-Type": "application/json; charset=utf-8",
               },
      body : JSON.stringify({          
        ResourceRequisition : document.getElementById('txt_area').value, 
        CandidateEmail : document.getElementById('email').value,
        Stages : document.getElementById('select').value, 
        PanelDeadline : document.getElementById('day').value,
       ResumeText : document.getElementById('resume_text').value, 
       ResumeUpload : document.getElementById('resume_file').value         
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
  
  this.props.callBackHook2();    
  }


  }
