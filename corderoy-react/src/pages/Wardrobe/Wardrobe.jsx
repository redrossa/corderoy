import '../../styles/Wardrobe/Wardrobe.scss';
import React from 'react';
import Navigation from './Navigation';
import {Outlet} from 'react-router-dom';
import Cart from './Cart';

export default class Wardrobe extends React.Component {
  render() {
    return (
        <div className="Wardrobe page">
          <Navigation />
          <div className="content">
            <Cart className="cart" />
            <Outlet />
          </div>
        </div>
    );
  }
}