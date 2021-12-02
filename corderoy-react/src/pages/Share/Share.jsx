import '../../styles/Share/Share.scss';
import React from 'react';
import Navigation from './Navigation';
import Cart from './Cart';

export default class Share extends React.Component {
  render() {
    return (
        <div className="Share page">
          <Navigation />
          <div className="content">
            <div className="title">
              <h1>Your outfit selection</h1>
            </div>
            <Cart />
          </div>
        </div>
    );
  }
}