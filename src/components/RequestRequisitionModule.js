import React, { Component } from 'react';
import './NavMenu.css';
import { AddRequestRequisition } from './AddRequestRequisition'; 
import { RequestRequisitionList } from './RequestRequisitionList';


export class RequestRequisitionModule extends Component 
{ 
    constructor(props)
    {
     super(props);
     this.state = 
     {     
        dataFromEditRequestRequisition : [],
        refresh : false, 
        toggle : true
    };
  }
  editDatafunction = (editDataRequestRequisition) => 
  {
    this.setState({dataFromEditRequestRequisition : editDataRequestRequisition})    
  } 
  
  pageRefresh =() =>
  {
    this.setState({refresh : true})    
  }
  toggleState = () =>
  {
    this.setState({toggle : true})      
  }
    render()
    {     
        return(
        <div>
        <AddRequestRequisition
        dataeditRequestRequisition = {this.state.dataFromEditRequestRequisition}
        callPageRefresh = {this.pageRefresh}
        refreshRequestRequisitionList = {this.state.refresh}
        btnState={this.state.toggle}
        changeToggle = {this.toggleState}
        />  
        <RequestRequisitionList
        getEditDataRequestRequisition = {this.editDatafunction}
        refreshRequestRequisitionList = {this.state.refresh}
        />     
        </div>
        );
    }
}
