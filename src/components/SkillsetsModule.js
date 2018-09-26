import React, { Component } from 'react';
import './NavMenu.css';
import { SkillSetNavigator } from './SkillSetNavigator';
import { AddSkills } from './AddSkills';
// import {moment} from 'moment';

export class SkillsetsModule extends Component 
{ 
    constructor(props)
  {
   super(props);
   this.state = 
   {     
     skillsets : [],
     parentid : null,
     parentnode : null,
     refresh : false,
     toggle : true,
     fresh : false,
     idfromlist : [],
     skills : []   
  };
}
    componentWillMount()
    {
      this.fetchData();
    }    
//when adding new node node id and node parent
    call2skill = (fromskill1, fromskill2) => 
    {
      console.log(fromskill1)
      console.log(fromskill2)   
    this.setState({parentid :fromskill1, parentnode:fromskill2})
   // console.log("clicked skill :" + this.state.parentid == null? "" : this.state.parentid+ ":" +  this.state.parentnode == null? "" : this.state.parentnode);       
    }

// when edit call node record will come
  editcall = (editdata) => 
  {
    console.log("idfromlist : ");
    console.log( editdata);
     this.setState({idfromlist : editdata})    
  } 

  
  sendata =() =>
  {
    this.setState({refresh : true})  
  }
//page refresh
  page = () =>
  {
    this.setState({fresh : true})
  }
   
   fetchData = () =>
   { 
    fetch('api/SkillSet/skills')
      .then(response => response.json())
      .then(data => 
        {         
       this.setState({skillsets : data})
        });
   } 
    render()
    {       
        return(                     
            <div>
            <SkillSetNavigator 
            data = {this.state.skillsets} 
            CallBackHook = {this.call2skill}
            data2edit = {this.editcall}
            pagerefresh = {this.state.fresh} 
            showdata = {this.fetchData}
           /> 
            <AddSkills 
            selectedskills ={this.state.skillsets} 
            getskills = {this.state.idfromlist}
            parentid = {this.state.parentid}            
            parentnode ={this.state.parentnode} 
            refreshme = {this.page}
            />
            </div>            
            )      
           
            
    }
}