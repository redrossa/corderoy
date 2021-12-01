import '../../styles/wardrobe/Wardrobe.scss';
import React from 'react';
import {UserSelection} from './UserSelection';
import Navigation from './Navigation';
import {Outlet} from 'react-router-dom';
import Cart from './Cart';

export default class Wardrobe extends React.Component {
  render() {
    return (
        <div className="Wardrobe page">
          <Navigation />
          <div className="content">
            <UserSelection.Provider value={""}>
              <Cart className="cart" />
              <Outlet />
            </UserSelection.Provider>
          </div>
        </div>
    );
  }
}