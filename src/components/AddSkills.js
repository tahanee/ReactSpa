import React, { Component } from 'react';
import './NavMenu.css';

export class AddSkills extends Component 
{ 
    constructor(props)
  {
   super(props);
   this.state = 
   {    
     togle : false,
     check : false
   };
  }
 
 
  componentDidUpdate()
  {
    console.log("Received :" );
    console.log(this.props.getskills.parent);
    console.log(this.props.getskills.node);
    this.refs.nodenm.value = this.props.getskills.node == null? "": this.props.getskills.node;
    {this.state.check ?
    (this.refs.prntnode.value = this.props.getskills.parent == null? "" : this.props.getskills.parent):
    (this.refs.prntnode.value = this.props.parentnode == null? "" : this.props.parentnode); 
     }
    this.refs.prnt.value = this.props.parentid == null? "" : this.props.parentid;
  }
  Clear()
  {
    document.getElementById('form1').reset(); 
    document.getElementById('parentid').value = ''; 
    //this.refs.prnt.value = '';
  }
  postSkills()
  {  
    var url = "https://localhost:5001/Api/SkillSet/add2skills";
      fetch(url, {
        method : "POST",
        headers: {
                "Content-Type": "application/json; charset=utf-8",
                 },
        body : JSON.stringify({      
         node : document.getElementById('nodename').value,
        parent : document.getElementById('parentid').value       
        })
    })
    .then(function(response)
    {
        response => response.json()
        console.log(response.nodeName);       
    }).then((text) =>
    {
      this.Clear();           
      this.props.refreshme();
     // this.props.send2skill();        
    })   
    
  }

  updateSkills(_id)
  {
    var url = "https://localhost:5001/Api/SkillSet/"+ _id;
    fetch(url, {
      method : "PUT",
      headers: {
              "Content-Type": "application/json; charset=utf-8",
               },
      body : JSON.stringify({          
       // Id : document.getElementById('Id').value,
       node : document.getElementById('nodename').value,
      parent : document.getElementById('parentnode').value         
        })  
  })
  .then(function(response)
  {
      response => response.json();
      console.log(response);
  }).then((text) =>
  {   
    this.props.refreshme();  
    this.Clear();    
  })  
  }  
  render() 
  {  
   return(  
    <div>        
    <div> 
    <form id ="form1" className="form-vertical"> 
    <div className="form-group">
    <label>
    Skill Name 
    <input  className="form-control" type="text" id ="nodename" ref = "nodenm"/>
    </label>
    <label>
    Parent Skill
    <input  className="form-control" type="text" id = "parentnode" ref = "prntnode" disabled />                  
    </label>
    <input  className="form-control" type="hidden" id = "parentid" ref = "prnt"/> 
    <div ref="node">
    {/* {this.props.parentid}     */}
    </div>
    </div>   

    <div className="form-group">   
    {/* {this.state.togle?    */}
    <input  id="btn-size" className="btn btn-primary" type="button" value="Add Skills"  onClick={() => this.postSkills()}/>
    {/* :          */}
    <input  id="btn-size" className="btn btn-primary" type="button" value="Update Skills" onClick={() => this.updateSkills(this.props.getskills.id)}/>
    {/* }{this.state.togle == false} */}
    <input  id="btn-size" className="btn btn-success" type="button" value="Clear Skills" onClick={this.Clear} />   
    <div>
       {(this.props.selectedRecord == null)|| (this.props.btnState == true)? "": "Edit at this ID : " +this.props.selectedRecord.id}
    </div >    
    </div>
    </form>  
    </div> 
    </div>  
  );
  }
}

