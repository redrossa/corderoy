import React from 'react';
import Navigation from './Navigation';


export default class Home extends React.Component {
  render() {
    return (
        <div className="Feed Page">
          <Navigation />
          <Feed />
        </div>
    );
  }
}