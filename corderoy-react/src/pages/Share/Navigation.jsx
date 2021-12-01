import React from 'react';
import classNames from 'classnames';
import {Navbar, NavBrand, NavGroup} from '../../components/Navbar';
import {Link} from 'react-router-dom';

export default class Navigation extends React.Component {
  render() {
    return (
        <div className={classNames('Navigation', this.props.className)}>
          <Navbar>
            <NavBrand>Corderoy</NavBrand>
            <NavGroup>
              <Link to="/wardrobe">See what's new</Link>
            </NavGroup>
          </Navbar>
        </div>
    );
  }
}