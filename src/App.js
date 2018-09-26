import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { QandAmodule } from './components/QandAmodule';
import {QandAList} from './components/QandAList';
import {QnASubmission} from './components/QnASubmission';
import {SkillSetNavigator} from './components/SkillSetNavigator';
import {AddSkills} from './components/AddSkills'; 
import {SkillsetsModule} from './components/SkillsetsModule';
import {CandidateModule} from './components/FCandidateModule';
import {RequestRequisitionModule} from './components/RequestRequisitionModule';


export default class App extends Component {
  displayName = App.name

  render() 
  {
    return(
      <Layout>
        <Route exact path='/' component={QandAmodule} />        
        <Route path='/qna' component={QandAList}/>        
        <Route path='/qnasub' component={QnASubmission}/> 
        <Route path='/skills_tree' component={SkillSetNavigator}/> 
        <Route path='/add_skills' component={AddSkills}/>     
        <Route path='/skills_module' component={SkillsetsModule}/>
        <Route path='/jobs_module' component={RequestRequisitionModule}/> 
        <Route path='/candidate_module' component={CandidateModule}/> 
      </Layout>
      
    );
  }
}
