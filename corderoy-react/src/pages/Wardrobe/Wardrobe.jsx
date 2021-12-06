import '../../styles/Wardrobe/Wardrobe.scss';
import React from 'react';
import Navigation from './Navigation';
import {Outlet} from 'react-router-dom';
import Preview from './Preview';

export default class Wardrobe extends React.Component {
  render() {
    return (
        <div className="Wardrobe page">
          <Navigation />
          <div className="content">
            <div className="cart-wrapper">
              <Preview className="cart" />
            </div>
            <Outlet />
          </div>
        </div>
    );
  }
}