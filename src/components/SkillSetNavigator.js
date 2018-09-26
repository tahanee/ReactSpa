import React, { Component } from 'react';
import './NavMenu.css';
import 'bootstrap/dist/css/bootstrap.css';

export class SkillSetNavigator extends Component 
{ 
  constructor(props)
  {
   super(props);
   {
    
   }
 }
  //when new skill adding
  handleclick(e, node_id, node_text)
  {
    e.stopPropagation();   
    console.log(" selected node id :" +node_id)  ; 
    this.props.CallBackHook(node_id,  node_text);    
  }

  componentDidUpdate()
  { 
    if(this.props.pagerefresh == true)   
    {
      this.treeview();
      this.render();  
    }    
    // this.props.send2list?: fetchData
  }

  //Recursion call when new skill will added
  nodecallback = (fromskill1, fromskill2) => 
  {
    console.log(fromskill1)   
    this.props.CallBackHook(fromskill1, fromskill2);       
  }

//when edit will be clicked
  edit(node_id)
    {            
      this.props.data2edit(node_id);
      console.log("edit skills called : " + node_id);
    }
// recursion call when edit clicked
  editcallagain = (editdata) => 
  {    
    console.log("pass id to the edit function : " + editdata);
    this.props.data2edit(editdata);
  }

  // call for fetch data
   treeview = () =>
   {
     this.props.showdata();
   }
  delData(del_id)
  {
    console.log("Delete function called" + del_id);
   
    fetch('/Api/SkillSet/'+ del_id , {method: 'delete'})
    .then(function(response){
        if(response.ok){
                return response.text();}
        })
    .then((text) =>
    {
      this.treeview();
      this.render();        
    })
  }
  render() 
  {   
    var data = this.props.data;    
    //Console.log(data);
    if (!data) return null;
    return( 
      <div class="inner-addon left-addon">   
      <ul>
        {data.map((item) => {
          return (
          <li key={item.id} onClick={(e) =>this.handleclick(e,item.id, item.node)}>
            {item.node} &nbsp;             
            <i className= "glyphicon glyphicon-edit" onClick={() => this.edit(item)} ></i>          
           <i className= "glyphicon glyphicon-trash" onClick={() => this.delData(item.id)}></i>          
           <SkillSetNavigator
            data={item.children} 
            CallBackHook = {this.nodecallback}
            data2edit = {this.editcallagain}
            pagerefresh = {this.props.pagerefresh}
            showdata = {this.treeview}
            />
          </li>)
        })}
      </ul>
      </div>
    )    
  }   
}
