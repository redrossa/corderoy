import React from 'react';
import Navigation from './Navigation';
import {Outlet} from "react-router-dom";

export default class Home extends React.Component {
  render() {
    return (
        <div className="Feed page">
          <Navigation />
          <Outlet />
        </div>
    );
  }
}