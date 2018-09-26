import React, { PureComponent } from 'react';
import './NavMenu.css';
import { myConfig } from './config.js';

export class CandidateList extends PureComponent 
{
  baseURL = myConfig.apiUrl;
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
    fetch(this.baseURL+'Api/Candidate/CandidateData', {method: 'get'})
      .then(response => response.json())
      .then(data => {              
        this.setState({ candidatesList: data, loading: false });
      //  var val = data.map(value => value.id);
      //  this.props.fetchData     
      }).then((text) =>
      {
          this.renderForecastsTable(this.state.candidatesList);
      })  ;
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
              <td>{list.resourceRequisition}</td>
              <td>{list.candidateEmail}</td>
              <td>
              <i type="button" className= "glyphicon glyphicon-edit" value ="Edit"   onClick={() => this.editData(list)}/>
              <i type="button" className= "glyphicon glyphicon-trash" value ="Delete" onClick={() => this.delData(list.id)}/>                
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
  editData(_id)
  {    
    this.props.CallBackHook(_id);
    this.props.refreshme();
  }

  componentWillReceiveProps()
  {  
    this.fetchData();
    this.renderForecastsTable(this.state.candidatesList);   
  }

  delData(_id)
  {      
    console.log(_id);
    fetch(this.baseURL+'Api/Candidate/'+_id , {method: 'delete'})
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
      </div>
      <div>               
        {contents}
      </div>
      </div>      
    );
  }
}

