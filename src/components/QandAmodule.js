import React, { Component } from 'react';
import { QandAList } from './QandAList';
import { QnASubmission } from './QnASubmission';
import { SkillSetNavigator } from './SkillSetNavigator';
import { AddSkills } from './AddSkills';

import 'bootstrap/dist/css/bootstrap.css';

export class QandAmodule extends Component
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
      <QnASubmission title="Insert Question and Answer " 
      send2submsn = {this.sendata} 
      send2list = {this.state.toggle} 
      selectedRecord ={this.state.idfromlist}
      btnState={this.state.toggle} 
      callBackHook2 = {this.myCallback2}/>
      
      <QandAList title="Questions and answers List" 
      CallBackHook = {this.myCallback} 
      refreshme = {this.state.refresh}/>
      {/* <SkillSetNavigator data = {this.props.skillsets}/>      */}
      </div>
    );
  }
}
