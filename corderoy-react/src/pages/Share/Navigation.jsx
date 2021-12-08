import '../../styles/Share/Navigation.scss';
import React from 'react';
import classNames from 'classnames';
import {Navbar, NavBrand, NavGroup} from '../../components/Navbar';
import {Link} from 'react-router-dom';
import Corderoy from '../../images/Corderoy.svg';

export default class Navigation extends React.Component {
  render() {
    return (
        <div className={classNames('Navigation', this.props.className)}>
          <Navbar>
            <NavBrand>
              <img src={Corderoy} alt="Corderoy"/>
            </NavBrand>
            <NavGroup className="share-menu">
              <Link to="/wardrobe">Return to wardrobe</Link>
            </NavGroup>
          </Navbar>
        </div>
    );
  }
}