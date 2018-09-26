import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>reactapp</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/'} exact>
              <NavItem>
                <Glyphicon glyph='home' /> Home
              </NavItem>
            </LinkContainer>     
            <LinkContainer to={'/skills_module'}>
              <NavItem>
                <Glyphicon glyph='th-list'/> SkillsetsModule
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/jobs_module'}>
              <NavItem>
                <Glyphicon glyph='th-list'/> RequestRequisitionModule
              </NavItem>
            </LinkContainer> 
            <LinkContainer to={'/candidate_module'}>
              <NavItem>
                <Glyphicon glyph='th-list'/> Candidate
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
