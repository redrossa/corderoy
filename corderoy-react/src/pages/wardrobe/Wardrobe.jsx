import React from 'react';
import Navigation from './Navigation';
import {Outlet} from 'react-router-dom';

export default class Wardrobe extends React.Component {
  render() {
    return (
        <div className="Wardrobe page">
          <Navigation />
          <Outlet />
        </div>
    );
  }
}