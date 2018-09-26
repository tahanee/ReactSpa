import React, { Component } from 'react';
import './NavMenu.css';
import { AddCandidate } from './CandidateFiles/AddCandidate'; 
export class CandidateList extends Component 
{
  displayName = CandidateList.name
  constructor(props)
   {
    super(props);
    this.state = { candidatesList: [], loading: true };
    this.fetchData();
  }
    fetchData()
  {
   // alert("after refresh I am called");
    fetch('https://localhost:5001/api/Candidate/CandidateData')
      .then(response => response.json())
      .then(data => {              
        this.setState({ candidatesList: data, loading: false });
       var val = data.map(value => value.id);
      //  this.props.fetchData     
      });
  }

   renderForecastsTable(candidatesList) {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>ResourceRequisition</th>
            <th>CandidateEmail</th>            
          </tr>
        </thead>
        <tbody>
          {candidatesList.map(list =>
            <tr key={list.id}>
              <td>{list.id}</td>
              <td>{list.ResourceRequisition}</td>
              <td>{list.CandidateEmail}</td>
              <td>
              <input  id="btn-sizeList" type="button" className="btn btn-success" value ="Edit"   onClick={() => this.editData(list.id)}/>
              <input  id="btn-sizeList" type="button" className="btn btn-primary" value ="Delete" onClick={() => this.delData(list.id)}/>                
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

  componentDidUpdate()
  {
    if(this.props.refreshme)
    {
    this.fetchData();
    this.renderForecastsTable(this.state.candidatesList);
    }
    // this.props.send2list?: fetchData
  }

  delData(_id)
  {      
    console.log(_id);
    fetch('https://localhost:5001/Api/Candidate/'+_id , {method: 'delete'})
    .then(function(response){
        if(response.ok){
                return response.text();}
        })
    .then((text) =>
    {
        this.fetchData();
        this.renderForecastsTable(this.state.candidatesList);
    })  
        
  }

  render() 
  {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderForecastsTable(this.state.candidatesList);

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

