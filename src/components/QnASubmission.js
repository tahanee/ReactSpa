import React, { Component } from 'react'; 
import './NavMenu.css';
export class QnASubmission extends Component
 {
  render()
  {
    return (
        <div>        
        <div> 
        <form id ="form1" className="form-vertical"> 
        <div className="form-group">
        <label>
          Question:
          <input  className="form-control" type="text" id ="ques" ref = "quesval"/>
        </label> </div>
        <div className="form-group">
        <label>
          Answer:
          <input type="text" className="form-control" id ="ans" ref = "ansval"/>
        </label> </div>
        <div className="form-group">{this.props.btnState?
        <input  id="btn-size" className="btn btn-primary" type="button" value="Submit"  onClick={() => this.postData()}/>  : 
        <input  id="btn-size" className="btn btn-primary" type="button" value="Update" onClick={() => this.updateData(this.props.selectedRecord.id)}/>  } 
        <input  id="btn-size" className="btn btn-success" type="button" value="Clear" onClick={this.Clear} />   
        <div>
           {(this.props.selectedRecord == null)|| (this.props.btnState == true)? "": "Edit at this ID : " +this.props.selectedRecord.id}
        </div >
        <div>
           {this.props.btnState? "": <input  id="btn-size" className="btn btn-primary" type="button" value="Back" onClick={() => this.twoFn()} /> }
        </div >
        </div>
        </form>  
      </div>
      </div>
    );    
  }
  
  componentDidUpdate()
  {  
    this.refs.quesval.value = this.props.selectedRecord == null? "": this.props.selectedRecord.ques;
    this.refs.ansval.value = this.props.selectedRecord == null? "": this.props.selectedRecord.ans;
    //alert("2 the fetchlist" + this.props.send2list);    
  }
  
  twoFn()
  {
    //this.Clear();
    this.props.callBackHook2();
   // alert("After me clear will call");
    //document.getElementById('ques').innerHTML=""; 
    this.Clear();
  }
  
  Clear()
    {
        document.getElementById('form1').reset();       
    }
    postData()
    {   
      var url = "/Api/Values/Item";
      fetch(url, {
        method : "POST",
        headers: {
                "Content-Type": "application/json; charset=utf-8",
                 },
        body : JSON.stringify({          
         // Id : document.getElementById('Id').value,
            ques : document.getElementById('ques').value,
            ans : document.getElementById('ans').value       
            
        })
    })
    .then(function(response)
    {
        response => response.json()
    }).then((text) =>
    {
      this.Clear();
      console.log("sendata called");
      this.props.send2submsn();
      // LoadPosts_FetchAPI();    
    })  
    
    }    

    updateData(_id)
    {
      console.log(_id);
      var url = "/Api/Values/"+ _id;
      fetch(url, {
        method : "PUT",
        headers: {
                "Content-Type": "application/json; charset=utf-8",
                 },
        body : JSON.stringify({          
         // Id : document.getElementById('Id').value,
          ques : document.getElementById('ques').value,
          ans : document.getElementById('ans').value         
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
