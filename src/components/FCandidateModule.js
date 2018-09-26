import React, { Component } from 'react';
//import { CandidateList } from './CandidateList';
import { Candidate } from './Candidate';
import {CandidateList} from './FCandidateList';
import 'bootstrap/dist/css/bootstrap.css';

export class CandidateModule extends Component
 {    
  constructor(props)
  {
   super(props);
   this.state = 
   { 
     idfromlist: null,
     toggle: true,
     skillsets : [],
     refresh : false
  };
  //alert("QandA module is called");
   this.myCallback = this.myCallback.bind(this);   
   this.sendata = this.sendata.bind(this);   
 } 
  
 myCallback = (dataFromChild) => 
  {
   // alert("Parent method called with child data: " + dataFromChild.id);
     this.setState({idfromlist:dataFromChild, toggle: false})
     //this.setState({toggle: !toggle})
  }
  
  sendata =() =>
  {
    this.setState({refresh : true})    
  }

myCallback2 =()=>
{  
  this.setState({toggle: true})
}
  
  render()
   {
    return(
    <div>          
      <Candidate title="Insert Candidate Record " 
      send2submsn = {this.sendata} 
      btnState = {this.state.toggle} 
      selectedRecord ={this.state.idfromlist}
      btnState={this.state.toggle} 
      callBackHook2 = {this.myCallback2}
      refreshme = {this.sendata}
      refresh={this.state.refresh}/>
      
      <CandidateList title="Questions and answers List" 
      CallBackHook = {this.myCallback} 
      refreshme = {this.sendata}
      refresh={this.state.refresh}/>
      {/* <SkillSetNavigator data = {this.props.skillsets}/>      */}
      </div>
    );
  }
}
